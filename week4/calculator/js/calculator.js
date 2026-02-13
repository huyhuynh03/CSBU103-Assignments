/* ============================================================
 * CALCULATOR - JAVASCRIPT LOGIC
 * ============================================================
 * Mô tả    : File JS chính xử lý toàn bộ logic máy tính
 * Tác giả  : CSBU103 - Week 4 Assignment
 * Phiên bản: 1.0
 * ============================================================
 * Các phép toán hỗ trợ:
 *   + : Cộng (Addition)
 *   - : Trừ (Subtraction)
 *   × : Nhân (Multiplication)
 *   ÷ : Chia (Division)
 *   % : Chia lấy dư / Modular Divide (Modulo)
 * ============================================================
 * Tính năng:
 *   - Custom parser (không dùng eval) → an toàn hơn
 *   - Hỗ trợ bàn phím (Keyboard support)
 *   - Lịch sử tính toán (History) lưu localStorage
 *   - Xử lý edge cases: chia cho 0, tràn số, nhiều dấu chấm
 * ============================================================ */

/* ==========================================================
 * 1. KHỞI TẠO BIẾN TOÀN CỤC (Global Variables)
 * - currentInput: Chuỗi đang nhập trên display
 * - expression: Biểu thức hoàn chỉnh (hiển thị phía trên)
 * - hasResult: Đánh dấu vừa tính xong (để reset khi nhập tiếp)
 * - history: Mảng lưu lịch sử tính toán
 * ========================================================== */
let currentInput = "0"; // Giá trị hiện tại trên màn hình
let expression = ""; // Biểu thức đầy đủ (VD: "5 + 3")
let hasResult = false; // Cờ đánh dấu: đã có kết quả chưa?
let history = []; // Mảng lịch sử [{expression, result}, ...]

// Tham chiếu đến các phần tử DOM (lấy 1 lần để tối ưu hiệu suất)
const displayResult = document.getElementById("display-result");
const displayExpression = document.getElementById("display-expression");
const historyList = document.getElementById("history-list");
const historyPanel = document.getElementById("history-panel");

/* ==========================================================
 * 2. CÁC HÀM XỬ LÝ HIỂN THỊ (Display Functions)
 * ========================================================== */

/**
 * Cập nhật nội dung hiển thị trên màn hình calculator
 * - Dòng trên (expression): hiển thị biểu thức đang tính
 * - Dòng dưới (result): hiển thị số đang nhập hoặc kết quả
 */
function updateDisplay() {
  displayResult.textContent = currentInput;
  displayExpression.textContent = expression;
}

/**
 * Định dạng số cho đẹp (thêm dấu phân cách hàng nghìn)
 * VD: 1000000 → "1,000,000"
 * @param {number} num - Số cần định dạng
 * @returns {string} Chuỗi số đã định dạng
 */
function formatNumber(num) {
  // Nếu số quá lớn hoặc quá nhỏ, dùng notation khoa học
  if (Math.abs(num) > 1e15 || (Math.abs(num) < 1e-10 && num !== 0)) {
    return num.toExponential(6);
  }

  // Làm tròn tối đa 10 chữ số thập phân để tránh lỗi floating point
  // VD: 0.1 + 0.2 = 0.30000000000000004 → 0.3
  const rounded = parseFloat(num.toFixed(10));
  const parts = rounded.toString().split(".");
  // Thêm dấu phẩy phân cách hàng nghìn cho phần nguyên
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

/* ==========================================================
 * 3. CÁC HÀM NHẬP LIỆU (Input Functions)
 * ========================================================== */

/**
 * Thêm một chữ số (0-9) hoặc dấu chấm vào input hiện tại
 * Xử lý các trường hợp đặc biệt:
 * - Sau khi có kết quả → reset và bắt đầu số mới
 * - Chặn nhập nhiều dấu chấm (VD: "3.14.5" → không cho phép)
 * - Thay thế số 0 đứng đầu (VD: "07" → "7")
 *
 * @param {string} digit - Chữ số hoặc dấu chấm cần thêm
 */
function inputDigit(digit) {
  // Nếu vừa tính xong, reset để nhập số mới
  if (hasResult) {
    currentInput = "";
    expression = "";
    hasResult = false;
    displayResult.classList.remove("has-result");
  }

  // CHẶN nhập nhiều hơn 1 dấu chấm trong cùng 1 số
  // VD: "3.14" → bấm "." → không thêm nữa
  if (digit === "." && currentInput.includes(".")) {
    return; // Thoát hàm, không làm gì
  }

  // Xử lý dấu chấm đứng đầu: thêm "0" phía trước
  // VD: bấm "." → hiển thị "0."
  if (digit === "." && (currentInput === "0" || currentInput === "")) {
    currentInput = "0.";
  }
  // Thay thế số 0 mặc định khi bắt đầu nhập
  else if (currentInput === "0" && digit !== ".") {
    currentInput = digit;
  }
  // Trường hợp bình thường: nối thêm ký tự
  else {
    currentInput += digit;
  }

  updateDisplay();
}

/**
 * Thêm một phép toán (+, -, ×, ÷, MOD) vào biểu thức
 * Logic:
 * - Nếu đã có kết quả → dùng kết quả làm số đầu tiên
 * - Nếu đang nhập dở → tính kết quả trung gian rồi tiếp tục
 * - Nếu chưa nhập gì → chỉ đổi phép toán
 *
 * @param {string} operator - Phép toán: '+', '-', '×', '÷', 'MOD'
 */
function inputOperator(operator) {
  // Nếu vừa có kết quả, dùng kết quả đó tiếp tục tính
  if (hasResult) {
    hasResult = false;
    displayResult.classList.remove("has-result");
  }

  if (currentInput !== "") {
    // Có số đang nhập → đưa vào biểu thức
    expression += currentInput + " " + operator + " ";
    currentInput = ""; // Reset input để nhập số tiếp theo
  } else if (expression !== "") {
    // Chưa nhập số mới → đổi phép toán cuối cùng
    // VD: "5 + " → bấm "-" → "5 - "
    expression = expression.trim();
    // Xóa phép toán cũ (có thể là 1 ký tự hoặc "MOD")
    const parts = expression.split(" ");
    parts.pop(); // Xóa operator cuối
    expression = parts.join(" ") + " " + operator + " ";
  }

  updateDisplay();
}

/* ==========================================================
 * 4. CUSTOM PARSER - TÍNH TOÁN AN TOÀN
 * (Không dùng eval() vì lý do bảo mật)
 * ========================================================== */

/**
 * Phân tích và tính toán biểu thức toán học
 * Thuật toán:
 *   1. Tách biểu thức thành mảng các token (số và phép toán)
 *   2. Ưu tiên tính ×, ÷, MOD trước (theo quy tắc toán học)
 *   3. Sau đó tính +, - từ trái sang phải
 *
 * @param {string} expr - Biểu thức cần tính, VD: "5 + 3 × 2"
 * @returns {number|string} Kết quả hoặc chuỗi lỗi
 *
 * Ví dụ:
 *   parseExpression("5 + 3 × 2")  → 11 (tính 3×2=6, rồi 5+6=11)
 *   parseExpression("10 ÷ 0")     → "Lỗi: Chia cho 0!"
 *   parseExpression("17 MOD 5")   → 2
 */
function parseExpression(expr) {
  // Bước 1: Tách biểu thức thành mảng tokens
  // VD: "5 + 3 × 2" → ["5", "+", "3", "×", "2"]
  const tokens = expr.trim().split(/\s+/);

  // Kiểm tra biểu thức rỗng
  if (tokens.length === 0 || (tokens.length === 1 && tokens[0] === "")) {
    return 0;
  }

  // Bước 2: Chuyển các token số thành number, giữ nguyên operator
  const numbers = []; // Mảng chứa số
  const operators = []; // Mảng chứa phép toán

  for (let i = 0; i < tokens.length; i++) {
    if (i % 2 === 0) {
      // Vị trí chẵn → phải là số
      const num = parseFloat(tokens[i]);
      if (isNaN(num)) {
        return "Lỗi cú pháp!";
      }
      numbers.push(num);
    } else {
      // Vị trí lẻ → phải là phép toán
      operators.push(tokens[i]);
    }
  }

  // Bước 3: Xử lý phép nhân, chia, MOD TRƯỚC (ưu tiên cao hơn)
  // Duyệt từ trái sang phải, gặp ×, ÷, MOD thì tính ngay
  let i = 0;
  while (i < operators.length) {
    if (
      operators[i] === "×" ||
      operators[i] === "÷" ||
      operators[i] === "MOD"
    ) {
      let result;
      const a = numbers[i]; // Số bên trái
      const b = numbers[i + 1]; // Số bên phải

      switch (operators[i]) {
        case "×":
          result = a * b;
          break;
        case "÷":
          // Kiểm tra chia cho 0
          if (b === 0) {
            return "Lỗi: Chia cho 0!";
          }
          result = a / b;
          break;
        case "MOD":
          // Kiểm tra MOD cho 0
          if (b === 0) {
            return "Lỗi: Chia cho 0!";
          }
          result = a % b; // Phép chia lấy dư
          break;
      }

      // Thay thế 2 số và 1 operator bằng kết quả
      // VD: [5, 3, 2] với ["+", "×"] → tính 3×2=6 → [5, 6] với ["+"]
      numbers.splice(i, 2, result);
      operators.splice(i, 1);
      // Không tăng i vì mảng đã thu ngắn
    } else {
      i++; // Bỏ qua +, - (sẽ tính sau)
    }
  }

  // Bước 4: Xử lý phép cộng và trừ (từ trái sang phải)
  let finalResult = numbers[0];
  for (let j = 0; j < operators.length; j++) {
    switch (operators[j]) {
      case "+":
        finalResult += numbers[j + 1];
        break;
      case "-":
        finalResult -= numbers[j + 1];
        break;
      default:
        return "Lỗi: Phép toán không hợp lệ!";
    }
  }

  return finalResult;
}

/* ==========================================================
 * 5. HÀM TÍNH KẾT QUẢ (Calculate)
 * ========================================================== */

/**
 * Thực hiện tính toán khi bấm nút "="
 * Quy trình:
 *   1. Ghép expression + số cuối cùng
 *   2. Gọi parseExpression() để tính
 *   3. Hiển thị kết quả
 *   4. Thêm vào lịch sử
 */
function calculate() {
  // Không tính nếu chưa nhập gì
  if (expression === "" && currentInput === "0") return;
  if (expression === "" && currentInput === "") return;

  // Ghép biểu thức hoàn chỉnh
  let fullExpression = expression + currentInput;

  // Loại bỏ khoảng trắng thừa ở cuối
  fullExpression = fullExpression.trim();

  // Nếu kết thúc bằng operator, bỏ operator đó đi
  // VD: "5 + " → "5"
  const lastPart = fullExpression.split(" ").pop();
  if (["+", "-", "×", "÷", "MOD"].includes(lastPart)) {
    fullExpression = fullExpression
      .substring(0, fullExpression.lastIndexOf(lastPart))
      .trim();
  }

  if (fullExpression === "") return;

  // Gọi parser để tính
  const result = parseExpression(fullExpression);

  // Nếu kết quả là chuỗi lỗi
  if (typeof result === "string") {
    displayExpression.textContent = fullExpression;
    currentInput = result;
    expression = "";
    hasResult = true;
    updateDisplay();
    return;
  }

  // Định dạng kết quả
  const formattedResult = formatNumber(result);

  // Cập nhật display
  displayExpression.textContent = fullExpression + " =";
  currentInput = formattedResult;
  expression = "";
  hasResult = true;
  displayResult.classList.add("has-result");
  updateDisplay();

  // Lưu vào lịch sử
  addToHistory(fullExpression, formattedResult);
}

/* ==========================================================
 * 6. CÁC HÀM TIỆN ÍCH (Utility Functions)
 * ========================================================== */

/**
 * Xóa toàn bộ - Reset calculator về trạng thái ban đầu
 * Tương đương nút AC (All Clear) trên máy tính thật
 */
function clearAll() {
  currentInput = "0";
  expression = "";
  hasResult = false;
  displayResult.classList.remove("has-result");
  updateDisplay();
}

/**
 * Xóa 1 ký tự cuối cùng (Backspace/Delete)
 * - Nếu đang hiển thị kết quả → xóa hết
 * - Nếu chỉ còn 1 ký tự → hiển thị "0"
 * - Bình thường → xóa ký tự cuối
 */
function deleteChar() {
  if (hasResult) {
    clearAll();
    return;
  }

  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1); // Cắt bỏ ký tự cuối
  } else {
    currentInput = "0";
  }

  updateDisplay();
}

/**
 * Đổi dấu số hiện tại: dương → âm, âm → dương
 * VD: 5 → -5 → 5
 */
function toggleSign() {
  if (currentInput === "0" || currentInput === "") return;

  if (hasResult) {
    hasResult = false;
    displayResult.classList.remove("has-result");
    expression = "";
  }

  if (currentInput.startsWith("-")) {
    currentInput = currentInput.substring(1); // Bỏ dấu trừ
  } else {
    currentInput = "-" + currentInput; // Thêm dấu trừ
  }

  updateDisplay();
}

/* ==========================================================
 * 7. LỊCH SỬ TÍNH TOÁN (History Management)
 * - Lưu trữ trong localStorage để giữ khi reload trang
 * - Tối đa 20 phép tính gần nhất
 * ========================================================== */

/** Khóa localStorage để lưu lịch sử */
const HISTORY_KEY = "calculator_history";

/**
 * Tải lịch sử từ localStorage khi khởi động
 * Nếu chưa có dữ liệu → trả về mảng rỗng
 */
function loadHistory() {
  try {
    const saved = localStorage.getItem(HISTORY_KEY);
    history = saved ? JSON.parse(saved) : [];
  } catch (e) {
    // Nếu dữ liệu bị lỗi, reset lịch sử
    console.warn("Không thể tải lịch sử:", e);
    history = [];
  }
  renderHistory();
}

/**
 * Lưu lịch sử vào localStorage
 */
function saveHistory() {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn("Không thể lưu lịch sử:", e);
  }
}

/**
 * Thêm một phép tính vào lịch sử
 * Giới hạn tối đa 20 phép tính (xóa cái cũ nhất nếu đầy)
 *
 * @param {string} expr   - Biểu thức, VD: "5 + 3"
 * @param {string} result - Kết quả, VD: "8"
 */
function addToHistory(expr, result) {
  history.unshift({ expression: expr, result: result });

  // Giới hạn tối đa 20 mục
  if (history.length > 20) {
    history.pop(); // Xóa mục cũ nhất (cuối mảng)
  }

  saveHistory();
  renderHistory();
}

/**
 * Render (vẽ) danh sách lịch sử lên giao diện
 * Mỗi mục lịch sử có thể click để sử dụng lại kết quả
 */
function renderHistory() {
  if (!historyList) return;

  // Nếu chưa có lịch sử
  if (history.length === 0) {
    historyList.innerHTML =
      '<li class="history-empty">Chưa có phép tính nào</li>';
    return;
  }

  // Tạo HTML cho từng mục lịch sử
  historyList.innerHTML = history
    .map(
      (item, index) => `
        <li class="history-item" onclick="useHistoryItem(${index})" title="Click để sử dụng kết quả này">
            <span class="history-expression">${item.expression} =</span>
            <span class="history-result">${item.result}</span>
        </li>
    `,
    )
    .join("");
}

/**
 * Sử dụng một kết quả từ lịch sử
 * Click vào mục lịch sử → đưa kết quả lên display để tiếp tục tính
 *
 * @param {number} index - Vị trí trong mảng history
 */
function useHistoryItem(index) {
  if (index >= 0 && index < history.length) {
    currentInput = history[index].result;
    expression = "";
    hasResult = true;
    displayResult.classList.add("has-result");
    updateDisplay();
  }
}

/**
 * Toggle (đóng/mở) bảng lịch sử
 */
function toggleHistory() {
  historyPanel.classList.toggle("open");
  const btn = document.getElementById("history-toggle-btn");

  // Đổi text nút: "Lịch sử ▾" ↔ "Đóng ▴"
  if (historyPanel.classList.contains("open")) {
    btn.textContent = "▴ Đóng lịch sử";
  } else {
    btn.textContent = "▾ Lịch sử";
  }
}

/**
 * Xóa toàn bộ lịch sử tính toán
 */
function clearHistory() {
  history = [];
  saveHistory();
  renderHistory();
}

/* ==========================================================
 * 8. HỖ TRỢ BÀN PHÍM (Keyboard Support)
 * - Phím số 0-9     → nhập số
 * - Phím +, -, *, / → phép toán
 * - Phím Enter / =  → tính kết quả
 * - Phím Backspace  → xóa 1 ký tự
 * - Phím Escape     → xóa tất cả (AC)
 * - Phím .          → dấu chấm thập phân
 * - Phím % hoặc m   → phép MOD
 * ========================================================== */

/**
 * Lắng nghe sự kiện bấm phím trên toàn trang
 * preventDefault() ngăn hành vi mặc định của trình duyệt
 */
document.addEventListener("keydown", function (event) {
  const key = event.key;

  // Phím số 0-9
  if (key >= "0" && key <= "9") {
    event.preventDefault();
    inputDigit(key);
    highlightButton(key);
  }
  // Dấu chấm thập phân
  else if (key === ".") {
    event.preventDefault();
    inputDigit(".");
    highlightButton(".");
  }
  // Phép cộng
  else if (key === "+") {
    event.preventDefault();
    inputOperator("+");
    highlightButton("+");
  }
  // Phép trừ
  else if (key === "-") {
    event.preventDefault();
    inputOperator("-");
    highlightButton("-");
  }
  // Phép nhân (* trên bàn phím → × trên display)
  else if (key === "*") {
    event.preventDefault();
    inputOperator("×");
    highlightButton("×");
  }
  // Phép chia (/ trên bàn phím → ÷ trên display)
  else if (key === "/") {
    event.preventDefault();
    inputOperator("÷");
    highlightButton("÷");
  }
  // Phép MOD (% hoặc phím m)
  else if (key === "%" || key === "m" || key === "M") {
    event.preventDefault();
    inputOperator("MOD");
    highlightButton("MOD");
  }
  // Tính kết quả (Enter hoặc =)
  else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
    highlightButton("=");
  }
  // Xóa 1 ký tự (Backspace)
  else if (key === "Backspace") {
    event.preventDefault();
    deleteChar();
    highlightButton("DEL");
  }
  // Xóa tất cả (Escape)
  else if (key === "Escape") {
    event.preventDefault();
    clearAll();
    highlightButton("AC");
  }
});

/**
 * Tạo hiệu ứng highlight (sáng lên) cho nút khi bấm phím
 * Giúp người dùng biết phím nào đang được sử dụng
 *
 * @param {string} value - Giá trị của nút cần highlight
 */
function highlightButton(value) {
  // Tìm nút có data-value tương ứng
  const btn = document.querySelector(`[data-value="${value}"]`);
  if (btn) {
    btn.classList.add("keyboard-active");
    // Xóa highlight sau 150ms
    setTimeout(() => {
      btn.classList.remove("keyboard-active");
    }, 150);
  }
}

/* ==========================================================
 * 9. KHỞI TẠO KHI TRANG LOAD
 * - Tải lịch sử từ localStorage
 * - Cập nhật display ban đầu
 * ========================================================== */

// Sự kiện DOMContentLoaded: chạy khi HTML đã load xong
document.addEventListener("DOMContentLoaded", function () {
  loadHistory(); // Tải lịch sử
  updateDisplay(); // Hiển thị giá trị mặc định "0"
});

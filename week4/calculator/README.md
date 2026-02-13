# 🧮 Calculator - Web Application

> **CSBU103 - Assignment Week #4**
> Ứng dụng máy tính web sử dụng HTML, CSS & JavaScript

---

## 📋 Mô tả

Một ứng dụng máy tính web (web-based calculator) được xây dựng hoàn toàn bằng **HTML**, **CSS** và **JavaScript** thuần. Hỗ trợ đầy đủ các phép toán cơ bản theo yêu cầu bài tập.

## ✨ Tính năng

### Phép toán hỗ trợ:

| Phép toán   | Ký hiệu | Mô tả          |
| ----------- | ------- | -------------- |
| Cộng        | `+`     | Addition       |
| Trừ         | `−`     | Subtraction    |
| Nhân        | `×`     | Multiplication |
| Chia        | `÷`     | Division       |
| Chia lấy dư | `MOD`   | Modular Divide |

### Tính năng bổ sung:

- ⌨ **Hỗ trợ bàn phím**: Nhập số, phép toán, Enter, Backspace, Escape
- 📜 **Lịch sử tính toán**: Lưu trữ trong localStorage, click để tái sử dụng
- 🔒 **An toàn**: Sử dụng custom parser thay vì `eval()`
- 📱 **Responsive**: Hiển thị tốt trên mobile, tablet, desktop
- 🎨 **Dark mode UI**: Giao diện premium với hiệu ứng glassmorphism
- ± **Đổi dấu**: Chuyển đổi dương/âm

## 📁 Cấu trúc thư mục

```
calculator/
├── index.html          # Entry point - Cấu trúc HTML
├── css/
│   └── style.css       # Giao diện & Responsive design
├── js/
│   └── calculator.js   # Logic xử lý & Keyboard support
└── README.md           # File này - Tài liệu hướng dẫn
```

## 🚀 Cách sử dụng

1. Mở file `index.html` bằng trình duyệt web (Chrome, Firefox, Edge, Safari)
2. **Click** hoặc **bấm phím** để nhập số và phép toán
3. Bấm `=` hoặc `Enter` để tính kết quả

### Phím tắt:

| Phím             | Chức năng         |
| ---------------- | ----------------- |
| `0-9`            | Nhập số           |
| `+ - * /`        | Phép toán         |
| `%` hoặc `m`     | MOD (chia lấy dư) |
| `Enter` hoặc `=` | Tính kết quả      |
| `Backspace`      | Xóa 1 ký tự       |
| `Escape`         | Xóa tất cả (AC)   |

## 🛠 Công nghệ sử dụng

- **HTML5**: Semantic markup
- **CSS3**: Grid layout, Custom Properties, Animations, Responsive
- **JavaScript (ES6+)**: DOM manipulation, localStorage, Event handling
- **Google Fonts**: Inter

## 👤 Tác giả

- **Bài tập**: CSBU103 - Week #4 Assignment

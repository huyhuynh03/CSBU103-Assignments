# 🍜 Hệ Thống Đặt Món Nhà Hàng Yaki

**Hệ thống đặt món qua QR Code tích hợp AI Chatbot**

Giải pháp đặt món hoàn chỉnh cho nhà hàng - khách hàng quét mã QR, xem menu và đặt món trực tiếp từ bàn. Bếp nhận đơn real-time với bảng điều khiển riêng.

---

## ✨ Tính Năng Nổi Bật

### 🛒 Ứng Dụng Khách Hàng
- **Đặt món qua QR Code** - Khách quét mã để truy cập menu
- **Giao diện menu đẹp mắt** - Danh mục, hình ảnh, mô tả chi tiết
- **Giỏ hàng thông minh** - Thêm, xóa, cập nhật số lượng
- **AI Chatbot** - Hỗ trợ bởi Google Gemini để gợi ý món ăn
- **Đa ngôn ngữ** - Tiếng Việt, Anh, Trung, Nhật, Hàn

### 🍳 Giao Diện Bếp
- **Đơn hàng Real-time** - Thông báo ngay khi có đơn mới
- **Đánh dấu trạng thái** - Chờ / Đang nấu / Xong
- **Chỉ xem** - Không có quyền sửa (tập trung nấu ăn)

### 💰 Giao Diện Thu Ngân
- **Quản lý đơn** - Xem, sửa số lượng, xóa món
- **Clear bàn** - Thanh toán và reset bàn
- **Xem trạng thái** - Biết món đang nấu hay đã xong

### 👔 Giao Diện Quản Lý
- **Quyền đầy đủ** - Tất cả tính năng (đơn hàng + admin)
- **Quản lý sản phẩm** - Thêm, sửa, xóa món
- **Quản lý danh mục** - Tổ chức menu
- **Cài đặt số bàn** - Cấu hình số lượng bàn
- **Firebase Auth** - Đăng nhập bảo mật

---

## 🛠️ Công Nghệ Sử Dụng

| Công nghệ | Mục đích |
|-----------|----------|
| **HTML/CSS/JS** | Frontend (Không cần framework) |
| **Firebase** | Database & Xác thực |
| **Cloudflare Pages** | Hosting (Miễn phí) |
| **Cloudflare Workers** | API Proxy (Bảo mật API keys) |
| **Google Gemini** | AI Chatbot |

---

## 📦 Bao Gồm

```
├── index.html         # Trang chủ (chọn giao diện)
├── customer.html      # Giao diện khách hàng
├── kitchen.html       # Giao diện bếp (chỉ xem + trạng thái)
├── cashier.html       # Giao diện thu ngân (đơn + clear)
├── manager.html       # Giao diện quản lý (đầy đủ)
├── sw.js              # Service Worker (hỗ trợ offline)
├── ai-chatbot.js      # Module AI Chatbot
├── seed-products.html # Công cụ tạo dữ liệu mẫu
├── worker/            # Cloudflare Worker (API proxy)
├── docs/              # Hướng dẫn cài đặt (EN + VI)
└── LICENSE.md         # Điều khoản license
```

---

## 🚀 Bắt Đầu Nhanh

1. **Cài đặt Firebase** - Tạo project, lấy config
2. **Cài đặt Cloudflare** - Deploy Worker & Pages
3. **Cấu hình** - Thêm Firebase config & API keys
4. **Deploy** - Nhà hàng của bạn đã online!

📖 Xem `docs/SETUP_GUIDE_VI.md` để biết hướng dẫn chi tiết.

---

## 💰 Bảng Giá

| License | Giá | Domains | Bao gồm |
|---------|-----|---------|--------|
| **Basic** | $299 (~7.9 triệu VNĐ) | 1 | 4 giao diện + AI chatbot + tùy chỉnh thương hiệu + 1 tháng support |
| **Business** | $499 (~13.1 triệu VNĐ) | 3 | Tất cả Basic + 3 lần cài + priority support |

---

## 📞 Liên Hệ & Hỗ Trợ

- 📧 Email: huynhvuquochuy37@gmail.com
- 🐙 GitHub: https://github.com/huyhuynh03
- 💼 LinkedIn: https://www.linkedin.com/in/huy-huynh-2701b1271/

---

**© 2024 Huy Huynh. Bảo lưu mọi quyền.**

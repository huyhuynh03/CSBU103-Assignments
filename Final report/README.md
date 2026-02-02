# 🍜 Yaki Restaurant Order System

**QR-Based Table Ordering System with AI Chatbot**

A complete restaurant ordering solution that allows customers to scan QR codes, browse menus, and place orders directly from their tables. Kitchen staff receive orders in real-time with a dedicated dashboard.

---

## ✨ Key Features

### 🛒 Customer App
- **QR Code Ordering** - Customers scan to access menu
- **Beautiful Menu Display** - Categories, images, descriptions
- **Smart Cart** - Add, remove, update quantities
- **AI Chatbot** - Powered by Google Gemini for food recommendations
- **Multi-language** - English, Vietnamese, Chinese, Japanese, Korean

### 🍳 Kitchen Display
- **Real-time Orders** - Instant notification when orders placed
- **Status Updates** - Mark items as Pending / Cooking / Done
- **View Only** - No edit permissions (kitchen focused)

### 💰 Cashier Interface
- **Order Management** - View, edit quantities, delete items
- **Clear Table** - Process payments and reset tables
- **Status View** - See cooking status (read only)

### 👔 Manager Panel
- **Full Access** - All features (orders + admin)
- **Product Management** - Add, edit, delete menu items
- **Category Management** - Organize menu categories
- **Table Settings** - Configure number of tables
- **Firebase Auth** - Secure login required

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML/CSS/JS** | Frontend (No framework needed) |
| **Firebase** | Database & Authentication |
| **Cloudflare Pages** | Hosting (Free) |
| **Cloudflare Workers** | API Proxy (Secure API keys) |
| **Google Gemini** | AI Chatbot |

---

## 📦 What's Included

```
├── index.html         # Landing page (interface selector)
├── customer.html      # Customer ordering interface
├── kitchen.html       # Kitchen display (status only)
├── cashier.html       # Cashier interface (orders + clear)
├── manager.html       # Manager panel (full admin)
├── sw.js              # Service Worker (offline support)
├── ai-chatbot.js      # AI Chatbot module
├── seed-products.html # Sample data seeder
├── worker/            # Cloudflare Worker (API proxy)
├── docs/              # Setup guides (EN + VI)
└── LICENSE.md         # License agreement
```

---

## 🚀 Quick Start

1. **Setup Firebase** - Create project, get config
2. **Setup Cloudflare** - Deploy Worker & Pages
3. **Configure** - Add your Firebase config & API keys
4. **Deploy** - Your restaurant is online!

📖 See `docs/SETUP_GUIDE_EN.md` for detailed instructions.

---

## 💰 Pricing

| License | Price | Domains | Includes |
|---------|-------|---------|----------|
| **Basic** | $299 | 1 | 4 interfaces + AI chatbot + brand customization + 1 month support |
| **Business** | $499 | 3 | All Basic + 3 installations + priority support |

---

## 📞 Contact & Support

- 📧 Email: huynhvuquochuy37@gmail.com
- 🐙 GitHub: https://github.com/huyhuynh03
- 💼 LinkedIn: https://www.linkedin.com/in/huy-huynh-2701b1271/

---

**© 2024 Huy Huynh. All rights reserved.**

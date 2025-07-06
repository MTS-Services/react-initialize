![alt text](public/pages-pic/Heading.jpg)

# 🏠 Rental Property Application (MERN)

A full-featured rental application built with **React**. Users can browse, search, and book rental properties. The platform includes property details, user authentication, reviews, and a responsive UI optimized for all devices.

---

## 🔧 Technologies Used

### **Frontend :**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white)
![React Toastify](https://img.shields.io/badge/Toastify-FFE484?style=for-the-badge&logo=react-toastify&logoColor=black)

### **Backend :**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

### **Authentication :**

![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![LocalStorage](https://img.shields.io/badge/Local_Storage-FF9900?style=for-the-badge&logo=html5&logoColor=white)

### **Payments :**

![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Stripe CLI](https://img.shields.io/badge/Stripe_CLI-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

### **Deployment :**

![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

# ✨ Features

### 🎉 Main

- ⚡ Fast and modern UI built
- 📱 Fully responsive design
- 💰 Payement base subscription
- 📝 Translation language NL to EN
- 🔍 Browse and search for rental Property
- 🏡 View property details with image gallery
- 💾 User profile with saved listings

### 📝 Auth

- 🔐 JWT-based User authentication (Login/Register)
- 📋 Role-based access (Admin/User)

### 👤 User Management

- 👤 User profile management:
- 📝 Edit personal info
- 📝 View booking history
- ✨ Wishlist/starred properties

### 👤 Admin Management

- 👤 Admin profile
- 📝 Edit personal info
- 📝 View property history
- 🎨 User info table

# 🗂 Project Structure

### 🌐 Public Assets (`public/`)

- 📝 `about/` - Marketing content
- 🏠 `home/` - Landing page assets
- 🌍 `locales/` - Translation files
  - 🇬🇧 `en/` - English
  - 🇳🇱 `nl/` - Dutch

### 💻 Application Code (`src/`)

- 🧩 **Components**

  - ♻️ `common/` - Shared UI
  - ❌ `error/` - Error boundaries
  - ⭐ `Favourite*` - Bookmarking
  - 🌐 `LanguageSwitcher` - i18n toggle

- 🌐 **Context Providers**

  - 🔐 `AuthContext` - JWT management
  - 💖 `FavouriteContext` - Saved properties
  - 🌓 `ThemeContext` - Dark/light mode

- 🚀 **Features**

  - 🔑 `auth/` - Authentication
  - 🏘️ `property/` - Listing logic

- 📄 **Pages**
  - 🔒 `private/` - Auth-required routes
    - 👑 `admin/` - Admin dashboard
    - 🏡 `Properties/` - Listings management
  - 🔓 `public/` - Open routes
    - 🔍 `FilterPage` - Search functionality
    - ❤️ `FavouritePage` - Saved items

# 🔧 Installation Guid

1. **Clone the repo:**

   ```bash
   git clone https://github.com/MTS-Services/react-initialize

   cd react-initialize

   npm install

   npm run dev

   http://localhost:5173

   ```

---

## 🎨 Tailwind Development vsCode Editor setup

### Step-1 : To get started, install prettier-plugin-tailwindcss as a dev-dependency:

```js
npm install -D prettier prettier-plugin-tailwindcss
```

### Step-2 : Then add the plugin to your Prettier configuration:

```js
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

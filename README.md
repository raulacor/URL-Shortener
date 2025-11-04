# 🔗 URL Shortener

A simple and modern **URL Shortener** built using **Flask (Python)**, **HTML**, **CSS**, and **JavaScript**.  
Users can input a long URL, and the app generates a **shortened link** using the TinyURL API through the `pyshorteners` library.

---

## 📋 Table of Contents

- [How It Works](#how-it-works)  
- [Features](#features)  
- [Example](#example)  
- [Example](#exemple)

---

## 🧠 How It Works

1. The user types or pastes a URL into the input field.  
2. When clicking the **“+”** button:
   - ✅ If the input is valid, the Flask backend shortens the URL using TinyURL.  
   - ❌ If empty, no URL is added.  
3. The shortened link is displayed below in a dynamic list.  
4. URLs are also stored in **LocalStorage**, persisting across sessions.  
5. Each URL item includes options to **copy** or **delete**.

---

## 🚀 Features

- Responsive and minimalist design.  
- Flask backend with API routes (`/shorten` and `/limpar`).  
- Uses `pyshorteners` for TinyURL integration.  
- Dynamic frontend with JavaScript for real-time updates.  
- LocalStorage support to persist URLs.  
- Copy-to-clipboard and delete functionality.

---

## 🌐 Example

![Image](https://github.com/user-attachments/assets/ef6b4e3f-92a2-4290-8425-38036905d659)

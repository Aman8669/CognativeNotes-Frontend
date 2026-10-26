# 🧠 CognitiveNotes - Frontend (AI-Powered Second Brain)

CognitiveNotes is a modern, responsive, full-stack SaaS note-management application designed to help users capture thoughts, organize notes, and leverage AI capabilities seamlessly. 

This repository contains the **Frontend** built with **React, Vite, and Modern CSS**, featuring a polished split-screen authentication layout, custom SVG branding, and optimized client-side routing.

---

## 🛠️ Tech Stack & Libraries

| Technology | Purpose |
| :--- | :--- |
| **React (v18+)** | Component-based UI architecture & state management. |
| **Vite** | Blazing-fast frontend build tool and development server. |
| **CSS3 (Custom / Modular)** | Responsive styling using modern layout techniques (CSS Grid, Flexbox, Dynamic Viewport Units `dvh`). |
| **React Router (v6)** | Client-side navigation and protected route handling. |
| **Axios / Fetch API** | HTTP client for communicating with the Spring Boot REST backend. |

---

## 💡 Why We Used It (Architectural Decisions)

### 1. React + Vite
* **Why:** Traditional Create React App (CRA) is deprecated and slow. Vite provides lightning-fast Hot Module Replacement (HMR) and an optimized production bundle, significantly speeding up the development feedback loop.

### 2. Custom Modular CSS (`Auth.css`, component-scoped styling)
* **Why:** Instead of heavy UI component libraries (like Material-UI or AntD) that bloat bundle sizes, we wrote clean, custom CSS. This gave us absolute control over pixel-perfect layouts, custom animations, and a lightweight footprint.
* **Mobile-First Responsiveness:** Utilized dynamic viewport units (`100dvh`) to completely eliminate mobile browser layout shifts and keyboard overlapping glitches during the authentication phase.

### 3. SVG-Based Branding & Favicon
* **Why:** Replaced default Vite assets with a custom-designed vector icon (`favicon.svg`) representing an AI brain/notes motif. SVG ensures crisp scaling across all high-density retina displays without performance overhead.

---

## ⚙️ How It Was Implemented (Key Features & Structure)

### 1. Modular Architecture & Routing
The frontend is structured logically to separate views, components, and services:
* **Authentication Flow:** A robust, responsive split-screen auth interface supporting secure Login and Registration with real-time input validations (including strict password validation rules).
* **Protected Views:** Seamless navigation guarding user notes and AI generation dashboards behind secure JWT authentication tokens stored in client session/local storage.

### 2. Responsive Split-Screen Layout (`Auth.css`)
* Designed a modern 50/50 split layout on desktop (Brand storytelling on one side, interactive auth form on the other).
* Automatically collapses gracefully into a clean single-column layout on mobile screens using CSS media queries and flexbox wrapping, ensuring optimal UX across devices.

### 3. AI & Backend Integration
* Built clean API service layers using Axios to securely communicate with the Java Spring Boot backend (`localhost:8080` / production Render URL).
* Handled JWT bearer token injection via HTTP interceptors for authenticated note CRUD operations and AI text processing requests.

---

## 🚀 Getting Started Locally

Follow these steps to run the frontend locally on your machine:

### Prerequisites
Make sure you have **Node.js** (v18 or higher) installed.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Aman8669/CognativeNotes.git](https://github.com/Aman8669/CognativeNotes.git)
   cd cognitivenotes
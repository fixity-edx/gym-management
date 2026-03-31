# GymAutomation Enterprise 🚀
### IoT-Enabled Multi-Branch Gym Membership & AI Automation System

A premium MERN SaaS platform for modern gym management, featuring IoT-driven attendance, AI retention analytics, and multi-tenant architecture.

## ✨ Key Features

-   **🔐 Multi-Role Security**: JWT-based RBAC for Members, Staff, and Admins.
-   **🏢 Multi-Branch Architecture**: Centralized management for unlimited gym locations.
-   **📡 IoT Sync**: Simulated hardware (QR/RFID) for automated check-ins and gate control.
-   **🧠 Grok AI Integration**: 
    -   Attendance behavior summarization.
    -   Churn risk prediction (Adminalytics).
    -   Subscription upgrade recommendations.
    -   Branch performance insights.
-   **📱 Digital Identity**: QR-based membership cards for every member.
-   **📊 Premium Dashboards**: Real-time analytics with Recharts and glassmorphism.

## 🛠 Tech Stack

-   **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide Icons.
-   **Backend**: Node.js, Express.js, MongoDB (Mongoose), Socket.IO.
-   **AI**: Groq API (llama-3.1-8b-instant).
-   **Security**: JWT, BcryptJS.

## 🚀 Getting Started

1.  **Environment Setup**:
    Ensure `server/.env` contains:
    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_secret
    GROK_API_KEY=your_grok_key
    ADMIN_EMAIL=admin@gmail.com
    ADMIN_PASSWORD=admin123
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    cd server && npm install
    ```

3.  **Run Application**:
    ```bash
    npm start
    ```
    ```
    - Frontend: `http://localhost:5173` (Vite)
    - Backend: `http://localhost:3001` (Express)

## 🛡 Admin Credentials
- **Email**: `admin@gmail.com`
- **Password**: `admin123`
*(Configured via .env)*

## 🤖 AI Capabilities
The system leverages **Grok AI** to analyze member data:
- **Member Dashboard**: Get summaries of your workout consistency.
- **Admin Hub**: Identify "High Risk" members likely to churn.
- **Revenue Hub**: Real-time growth suggestions based on branch performance.

## 👥 Staff Features
- **Check-in Simulator**: Handles QR/RFID scans manually.
- **Member Management**: Enroll new members and freeze accounts.
- **Privacy First**: Access to aggregated stats without sensitive revenue data.

## ✅ API Verification Results
*Automated test suite run on 2026-02-11*

| Scope | Endpoint | Method | Status |
|-------|----------|--------|--------|
| **Auth** | `/api/auth/login` | POST | ✅ PASS |
| **Auth** | `/api/auth/signup` | POST | ✅ PASS |
| **Admin** | `/api/admin/stats` | GET | ✅ PASS |
| **Admin** | `/api/branches` | POST | ✅ PASS |
| **Admin** | `/api/subscriptions` | POST | ✅ PASS |
| **Admin** | `/api/iot/devices` | POST | ✅ PASS |
| **Staff** | `/api/staff/stats` | GET | ✅ PASS |
| **Staff** | `/api/members` | GET | ✅ PASS |
| **Member** | `/api/members/history` | GET | ✅ PASS |
| **Member** | `/api/subscriptions/buy` | POST | ✅ PASS |
| **IoT** | `/api/iot/check-in` | POST | ✅ PASS |
| **AI** | `/api/ai/admin/churn-analytics` | GET | ✅ PASS |

---
Built by Antigravity AI @ Google Deepmind

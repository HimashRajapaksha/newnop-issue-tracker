# 🧩 Newnop Issue Tracker

A full-stack Issue Tracking System built for the **Associate Software Engineer (Frontend) assignment**.

---

## 🚀 Features

### Core Features

* Create, update, delete issues
* Issue status workflow (Open → In Progress → Resolved → Closed)
* Priority & severity tracking
* Search + filters (status, priority, severity)
* Pagination support
* Issue statistics dashboard

### Bonus Features

* Export issues (CSV & JSON)
* Optimized search (debounced requests)
* Clean UI/UX with reusable components
* Confirmation modals for actions
* Toast notifications

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Tailwind CSS
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## 📂 Project Structure

```
client/   → Frontend (React)
server/   → Backend (Node + Express)
```

---

## ⚙️ Environment Setup

### Backend `.env`

Create:

```
server/.env
```

Add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

---

## ▶️ Run Locally

### Install dependencies

```
npm install
cd client && npm install
cd ../server && npm install
```

### Run project

```
npm run dev
```

* Frontend: http://localhost:5173
* Backend: http://localhost:5000

---

## 🌐 Deployment

### Frontend (Vercel)

1. Go to https://vercel.com
2. Import GitHub repo
3. Select `client` folder as root
4. Add environment variable:

```
VITE_API_URL=https://your-backend-url
```

---

### Backend (Render)

1. Go to https://render.com
2. Create Web Service
3. Select `server` folder
4. Add env:

```
MONGO_URI=your_mongodb_uri
PORT=5000
```

---

## 📸 Demo Features

* View all issues
* Filter by status, priority, severity
* Search issues
* Create new issue
* Update issue
* Delete issue
* Export data

---

## 📌 Notes

* Designed with clean UI/UX principles
* Backend follows RESTful API design
* Frontend uses reusable component architecture

---

## 👤 Author

Himash Rajapaksha

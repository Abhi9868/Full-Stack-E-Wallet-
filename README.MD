# 🚀 FullStack E-Wallet App (Frontend + Backend + MongoDB)

This is a fullstack E-wallet application built with:

- **React (Vite)** for the frontend
- **Node.js (Express)** for the backend
- **MongoDB** as the database

The app can be run in three ways:

- Without Docker
- With Docker manually
- Using Docker Compose (recommended)

---

## 📁 Project Structure

```plaintext
FullStack-Ewallet/
├── .env                    # Shared environment variables
├── client/                 # React frontend
│   ├── Dockerfile          # Frontend Dockerfile
│   ├── .env                # Frontend env vars (if needed)
│   └── ...                 # React/Vite files
├── server/                 # Express backend
│   ├── Dockerfile          # Backend Dockerfile
│   ├── .env                # Backend env vars
│   └── ...                 # Node.js files
├── docker-compose.yml      # Main compose file
└── README.md
```

---

## ✅ Prerequisites

- Node.js (v18+)
- MongoDB (local or Docker)
- Docker & Docker Compose installed

## 🧪 Environment Setup

Create `.env` in the `server/` folder:

```env
PORT=5000
MONGO_URI=mongodb://mongo:27017/ewallet
JWT_SECRET=your_jwt_secret
```

- `MONGO_URI`: MongoDB connection string. If using Docker, use `mongodb://mongo:27017/ewallet`.

- `JWT_SECRET`: Secret key for JWT signing. Change it to a strong secret in production.
- `PORT`: Port for the Express server. Default is `5000`. Change if needed.
- `NODE_ENV`: Set to `production` in production environments.

## 🔧 Run the App WITHOUT Docker

### 🧩 1. Start MongoDB locally

```bash
mongod
```

Or use MongoDB Compass / Atlas.

### 🛠 2. Run Backend

```bash
cd server
npm install
npm run dev
```

Runs on: http://localhost:5000

## 🐳 Run the App WITH Docker Only

### 🔹 Backend

```bash
cd server
docker build -t ewallet-backend .
docker run -d -p 5000:5000 --env-file .env --name backend ewallet-backend
```

### 🔹 Frontend

```bash
cd ../client
docker build -t ewallet-frontend .
docker run -d -p 3000:80 --name frontend ewallet-frontend
```

### 🔹 MongoDB

```bash
docker run -d -p 27017:27017 --name mongo mongo:7
```

## 🛠️ Run the App USING Docker Compose (Recommended)

### 📦 1. Build and Run

```bash
docker compose up --build
```

Or in detached mode:

```bash
docker compose up --build -d
```

### 🧹 2. Stop and Remove Containers

```bash
docker compose down
```

## 🌍 Access App

### Frontend: http://localhost:3000

### Backend: http://localhost:5000

### MongoDB: mongodb://localhost:27017

## 🧼 Clean Docker Resources

```bash
# Stop all running containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)

# Remove all images
docker rmi $(docker images -q)

# Remove all volumes
docker volume rm $(docker volume ls -q)

# Prune everything (use with caution)
docker system prune -a --volumes
```

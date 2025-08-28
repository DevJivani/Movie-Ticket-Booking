# 🎬 Movie Ticket Booking System (MERN Stack)

A full-stack Movie Ticket Booking Web App built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse movies, view showtimes, book seats using a virtual theater, and download tickets. Admins can manage movies, cinemas, theaters, and shows.

---

## 📌 Features

### 👤 User Features

- View latest released movies (without login)
- View detailed information about movies
- User authentication (Login/Signup)
- Book movie tickets by:
  - Selecting movie, date (Today or Tomorrow only)
  - Viewing all available shows with cinema and theater names
  - Selecting show time (disabled if already played)
  - Choosing seats from a virtual theater layout
- Confirm booking and mark seats as reserved
- View booked tickets
- Download tickets as PDF
- View ticket details (movie, cinema, location, screen(theater), time, seat numbers, QR code, etc.)

### 🛠️ Admin Features

- Admin authentication
- Add and manage:
  - 🎦 Movies (add, delete)
  - 🏢 Cinemas
  - 🎭 Theaters (linked to cinemas)
  - ⏰ Shows (movie + theater + cinema + time + ticket price)
    - Can be added from movie view page with pre-filled fields

---

## 🧱 Tech Stack

| Layer        | Technology                       |
|--------------|----------------------------------|
| Frontend     | React (Vite) + Tailwind CSS       |
| Backend      | Node.js + Express.js              |
| Database     | MongoDB (Mongoose)                |
| Auth         | JWT (JSON Web Token)              |
| Image Upload | Cloudinary                        |
| Deployment   | Vercel (Frontend), Render (Backend) |

---

## 🚀 How to Run the Project

### 1. Clone the Repository
```
git clone https://github.com/SmitHaraniya35/cinebooking.git
cd cinebooking
```

### 2. Setup the Backend
```
cd server
npm install
```
- Create a .env file in the server directory and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

VITE_FRONTEND_URL=( your locahost url of frontend )
```
- Start the backend server:
```
node server.js or npm start
```

### 3. Setup the Frontend
```
cd client
npm install
```
- Create a .env file in the server directory and add:
```
VITE_BACKEND_API_URL = your Backed url
```
- Start the frontend server:
```
npm run dev
```

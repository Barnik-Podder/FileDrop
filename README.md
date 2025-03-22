# 📂 FileDrop - Secure & Instant File Sharing

FileDrop is a seamless and secure file-sharing application built using **React (Create React App) & Node.js**. Effortlessly upload files, generate shareable links, and even scan QR codes to download files on any device. Say goodbye to cumbersome email attachments and enjoy hassle-free file transfers!

---

## 🚀 Tech Stack

### 🌐 Frontend
- **Create React App (CRA) + React.js**
- **Axios** 🔗 API requests
- **React Toastify** 🍞 Notifications
- **QR Code Generator** 📱 Quick scan for downloads

### ⚙️ Backend
- **Node.js + Express** 🛠️ Robust API
- **MongoDB Atlas** 🌍 Secure file metadata storage
- **Cloudinary** ☁️ File storing
- **Cors & Dotenv** 🔒 Secure environment management

---

## 🧐 Installation & Setup

### 1⃣ Clone the Repository
```sh
 git clone https://github.com/Barnik-Podder/FileDrop.git
```

### 2⃣ Backend Setup
#### Navigate to the backend directory
```sh
cd backend
```
#### Install Dependencies
```sh
npm install
```
#### Setup Environment Variables
Create a `.env` file in the `backend` directory and add the following:
```env
PORT=5000
MONGO_DB_URL=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
#### Run the Backend
```sh
npm run dev
```

### 3⃣ Frontend Setup
#### Navigate to the frontend directory
```sh
cd frontend
```
#### Install Dependencies
```sh
npm install
```
#### Setup Environment Variables
Create a `.env` file in the `frontend` directory and add the following:
```env
REACT_APP_API_URI=your_backend_url
```
#### Start the Frontend
```sh
npm start
```

---

## 🔗 API Endpoints

| Method | Endpoint                     | Description            |
|--------|------------------------------|------------------------|
| GET    | `/`                          | Health check           |
| POST   | `/api/upload`                | Upload a file          |
| GET    | `/download/:id`              | Download a file        |
| GET    | `/download/filedetails/:id`  | Get file name and size |

---

## 🎯 Troubleshooting

### 🔍 Backend Issues
- Ensure **MongoDB Atlas** credentials are correct.
- Check if **Cloudinary API keys** are set properly.
- Restart the backend after modifying environment variables.

### 🔍 Frontend Issues
- Ensure **REACT_APP_API_URL** matches your backend URL.
- Run `npm install` if dependencies are missing.
- Clear browser cache if experiencing UI glitches.

---

## 🌟 Contributing
1. **Fork** the repository
2. Create a **new branch** (`git checkout -b feature-branch`)
3. **Commit** your changes (`git commit -m 'Added new feature'`)
4. **Push** to the branch (`git push origin feature-branch`)
5. Open a **Pull Request**

---

## 🐜 License
This project is licensed under the **MIT License**.

💙 Made with love by **Barnik**


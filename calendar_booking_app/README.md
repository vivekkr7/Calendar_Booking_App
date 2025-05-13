# 📅 Calendar Booking App (Full-Stack)

This is a full-stack Calendar Booking application built with:

- 🖥️ **Node.js + Express** for the backend API
- 📱 **Flutter** for the frontend UI

The app allows users to view available meeting room bookings, create new ones, update, and delete them, while handling conflicts and errors gracefully.

---

## 📦 Features

### ✅ API Functionality

- `GET /bookings` – Retrieve all bookings
- `GET /bookings/:id` – Retrieve a single booking by ID
- `POST /bookings` – Create a new booking
- `PUT /bookings/:id` – Update a booking by ID
- `DELETE /bookings/:id` – Delete a booking by ID

### 🚀 Frontend Features

- Display all bookings
- Create new bookings
- Update existing bookings
- Delete bookings
- Error handling and feedback for invalid inputs or booking conflicts

---

## 🛠️ Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: Flutter
- **Database**: In-memory storage (can be changed to a database such as MongoDB or MySQL)

---

## ⚙️ Setup Instructions

### Backend (Node.js + Express)

1. Clone the repository:
   
   git clone https://github.com/yourusername/Calendar_Booking_App.git

2. Navigate to the api directory:
    cd calender-booking-api

3. Install the dependencies:
    npm install

4. Run the server:
    npm start

# The backend will run on http://localhost:3000.

Frontend (Flutter)
1. Clone the repository:
    git clone https://github.com/yourusername/Calendar_Booking_App.git

2. Navigate to the frontend directory:
    cd frontend

3. Install the dependencies:
    flutter pub get

4. Run the App:
    flutter run


The app will launch in the default browser or your selected emulator/device.

🧑‍💻 API Endpoints
GET /bookings
Retrieve all bookings.

Response: 200 OK with a list of bookings.

GET /bookings/:id
Retrieve a single booking by its ID.

Response: 200 OK with booking details.

Error: 404 Not Found if the booking ID doesn't exist.

POST /bookings
Create a new booking.

Request Body:
{
  "userId": "user-123",
  "startTime": "2025-03-01T10:00:00Z",
  "endTime": "2025-03-01T11:00:00Z"
}

💡 Notes
The app uses in-memory storage for bookings. If persist data is required, database like MongoDB, PostgreSQL, or MySQL can be used.

The Flutter app uses http to interact with the API.  API base URL has to be modified in the ApiService class based on local or deployed server.

🙌 Credits
Built with ❤️ using Flutter and Node.js
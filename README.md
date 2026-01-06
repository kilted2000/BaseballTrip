# Baseball BucketList 🏟️⚾

Baseball BucketList is a full-stack web application designed to help baseball fans plan multi-city MLB stadium road trips. The app pulls official MLB game schedules, allows users to search and filter games by team and date range, and saves searches to make trip planning easier and faster.

What started as a personal passion project has grown into a performance-focused, scalable full-stack application built with modern web technologies.

---

## 🚀 Features

- 🔍 Search MLB games by team(s) and date range  
- 📅 Cached game schedule data for fast filtering
- 💾 Save favorite searches for future reference
- 👤 User profiles and authentication (web only)
- 🌐 Deployed frontend and backend
- 📱 Ongoing work toward mobile support with React Native

---

## 🛠 Tech Stack

### Frontend
- **React** (Vite)
- **JavaScript (ES6+)**
- **Tailwind CSS**
- **Clerk** (Authentication – web app)
- **Netlify** (Deployment)

### Backend
- **Java**
- **Spring Boot**
- **REST API**
- **In-memory caching** (external MLB API data loaded at startup)
- **Render** (Deployment)

### Mobile (In Progress)
- **React Native**
- **Expo**
- **NativeWind**

---

## 🧠 Architecture Overview

- On application startup, the backend fetches MLB game data from an external API and caches it in memory.
- Client requests filter this cached data by:
  - Selected teams (2–4 teams)
  - Date range
- This approach avoids repeated external API calls and significantly improves response time.
- The backend currently does not use a database; persistence is handled via in-memory storage (database integration planned).

---

## 📂 Project Structure

BBRT/
├── backend/ # Spring Boot backend
│ ├── controller/
│ ├── service/
│ ├── model/
│ └── ...
│
├── roadtripHelper/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json

yaml
Copy code

---

## ⚙️ Environment Variables

### Frontend
Create a `.env` file in the frontend root:

VITE_API_BASE_URL=your_backend_url
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

python
Copy code

### Backend
Set the following environment variables (or configure in `application.properties`):

MLB_API_KEY=your_api_key

yaml
Copy code

---

## 🧪 Running Locally

### Backend
```bash
cd backend
./mvnw spring-boot:run
Frontend
bash
Copy code
cd roadtripHelper
npm install
npm run dev
🔮 Future Improvements
Database integration (PostgreSQL)

Pagination for large game result sets

Saved favorites and trip itineraries

Location-based recommendations (restaurants, attractions)

Full mobile parity with the web app

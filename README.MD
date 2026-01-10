# MyWildiary

**Wildlife Observation Tracker** - A web application for tracking and sharing wildlife observations with interactive maps and detailed species information.

**[Live Demo](https://my-wildiary.vercel.app/)** | **[GitHub Repository](https://github.com/MarketaG/my-wildiary)**

---

## About

Wildiary is a modern web application that allows users to document and share their wildlife observations. Built with Next.js and Express, it features an interactive Leaflet map, species database, and comprehensive observation tracking system.

_This project was created as a school assignment._

### Features

- Interactive map with observation markers
- Species database with conservation status
- Detailed observation logs with weather and habitat data
- Search and filter observations
- Dark/Light theme support

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local installation or Docker)

---

## Local Development (npm)

### 1. Environment Setup

#### Backend environment variables

Create `backend/.env.local`:

```properties
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/wildiary
```

#### Frontend environment variables

Create `frontend/.env.local`:

```properties
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

### 2. Backend Setup

```bash
cd backend
npm install
npm run seed    # Fill database with sample data
npm run dev     # Start backend server
```

Backend will run on: **http://localhost:4000**

---

### 3. Frontend Setup

Open a **new terminal** and run:

```bash
cd frontend
npm install
npm run dev     # Start frontend server
```

Frontend will run on: **http://localhost:3000**

---

### 4. Open Application

Navigate to **http://localhost:3000** in your browser.

---

## Docker Setup (Alternative)

If you prefer using Docker instead of local setup:

### 1. Environment Setup

#### Backend

Create `backend/.env.docker`:

```properties
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://mongo:27017/wildiary
```

#### Frontend

Create `frontend/.env.local`:

```properties
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

### 2. Start with Docker

```bash
# Start all services (MongoDB, Backend, Frontend)
docker compose up -d

# Seed database
docker compose exec backend npm run seed

# View logs
docker compose logs -f
```

Application will be available at:

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:4000
- **MongoDB:** localhost:27017

---

### 3. Stop Docker Services

```bash
docker compose down
```

---

## What seed creates

The seed script populates the database with sample data:

- **7 animals** - Red Deer, Red Fox, Roe Deer, Wild Boar, Eurasian Lynx, Brown Bear, Moose
- **3 users** - Demo user accounts
- **5 observations** - Sample wildlife observations with references to animals and users

**Warning:** Seed deletes all existing data in the collections!

---

## API Endpoints

- `GET /api/observations` - Get all observations
- `GET /api/observations/:id` - Get single observation
- `GET /api/observations/search?q=query` - Search observations
- `POST /api/observations` - Create new observation
- `PUT /api/observations/:id` - Update observation
- `DELETE /api/observations/:id` - Delete observation
- `GET /api/animals` - Get all animals

---

## Tech Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Leaflet (maps)
- Lucide React (icons)
- date-fns (date formatting and manipulation)

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- tsx (TypeScript execution for Node.js)

---

---

## License

This project is licensed under the MIT License.

---

## Author

**Markéta Grácová**

---

**Happy wildlife tracking!**

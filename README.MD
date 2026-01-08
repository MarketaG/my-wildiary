# My Wildiary

---

# Project launch

## First launch (with seed)

---

### I. Docker (recommended)

#### 1. Start Docker

```bash
docker-compose up -d
```

#### 2. Fill the database

```bash
docker-compose exec backend npm run seed
```

#### 3. Open the app

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:4000

---

### II. Local (without docker)

#### 1. Backend

```bash
cd backend
npm install
npm run dev
```

#### 2. Frontend (in the new terminal)

```bash
cd frontend
npm install
npm run dev
```

#### 3. Fill the database (in a new terminal)

```bash
cd backend
npm run seed
```

#### 4. Open the app

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:4000

---

## Normal launch (without seed)

### I. Docker

```bash
docker-compose up -d
```

### II. Local (without docker)

#### 1. Backend

```bash
cd backend
npm run dev
```

#### 2. Frontend (in a new terminal)

```bash
cd frontend
npm run dev
```

---

## 🌱 What seed creates:

- **7 animals** - Red Deer, Red Fox, Roe Deer, Wild Boar, Eurasian Lynx, Brown Bear, Moose
- **3 users**
- **5 observations** with references

** Warning:** Seed deletes all existing data!

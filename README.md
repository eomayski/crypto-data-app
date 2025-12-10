# :moneybag: Crypto Data App | SoftUni React Exam

A comprehensive cryptocurrency tracking and portfolio management application with real-time trading insights, news aggregation, and social features.

![Image](https://github.com/user-attachments/assets/4c27e74c-e34e-4711-8851-251fa4a9a851)

## ✨ Key Features

### 🔐 Authentication & User Management
- User registration and login
- Secure session management with localStorage persistence
- Protected routes for authenticated users

### 📊 Cryptocurrency Data & Analytics
- Browse all available cryptocurrencies with detailed information
- View crypto prices and market data
- Interactive carousel showcasing featured cryptocurrencies
- Search capabilities for quick navigation

![image](https://github.com/user-attachments/assets/a0c1f00b-b888-4bf3-8d38-2f26635550ca)

### 📰 Latest Crypto News
- Cryptocurrency news feed
- Detailed news article pages with full content

![image](https://github.com/user-attachments/assets/8ef7a3df-0039-410f-abf0-4755ab266336)

### 👥 Trader Community & Social Features
- Discover and follow other traders in the community
- View trader profile and portfolio
- Follow/Unfollow traders
- Real-time synchronization of follow status

![](https://github.com/user-attachments/assets/5d68b846-2765-49b7-98d1-2afdbb707f57)

### 💼 Portfolio Management
- Create and manage trading positions
- Track your cryptocurrency holdings and performance
- Add new positions with amount and entry price
- Edit existing positions to update information
- Delete positions when closing trades

![image](https://github.com/user-attachments/assets/fe6b047a-78d9-4579-b031-0cde785ef45d)

### ⭐ Favorites & Watchlist
- Mark favorite cryptocurrencies for quick access
- Manage a personalized watchlist of coins of interest
- Store favorites in localStorage for persistence

### 📱 Responsive UI
- Modern, clean interface built with React and Tailwind CSS
- Mobile-friendly design with responsive layouts
- Dark theme optimized for extended trading sessions
- Real-time UI updates with Vite hot module replacement

### 🚀 Performance
- Fast development server with Vite
- Optimized component rendering with React hooks
- Efficient state management using React Context API
- Custom hooks for request handling and localStorage persistence

## 🛠️ Tech Stack

**Frontend:**
- React 18+ with JSX
- Vite (development server & build tool)
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Slick for carousel

## 📦 Project Structure

```
crypto-data-app/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── coin/          # Coin management (add, edit, details)
│   │   │   ├── favorites/     # Favorite traders
│   │   │   ├── footer/        # Footer component
│   │   │   ├── guards/        # Route guards (Users, Guests)
│   │   │   ├── header/        # Navigation header
│   │   │   ├── home/          # Home page with carousel and news
│   │   │   ├── login/         # Login page
│   │   │   ├── logout/        # Logout handler
│   │   │   ├── news/          # News articles
│   │   │   ├── portfolio/     # Portfolio management
│   │   │   ├── register/      # Registration page
│   │   │   └── traders/       # Trader cards & profiles
│   │   ├── contexts/          # React Context (UserContext)
│   │   ├── hooks/             # Custom hooks (useRequest, usePersistedState, useForm)
│   │   ├── utils/             # Utilities (formatCurrency, formatPercentage)
│   │   ├── App.jsx            # Main app component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── server/
│   ├── server.js              # Node.js server
│   └── data/
│       ├── collections.json   # Available collections
│       ├── traders.json       # Trader profiles
│       ├── positions.json     # Trading positions
│       ├── followed.json      # Follow relationships
│       └── [other collections]
└── README.md
```

## 🚀 Getting Started

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd crypto-data-app
```

2. **Install client dependencies:**
```bash
cd client
npm install
```

### Running the Application

**Terminal 1 - Start the backend server:**
```bash
cd server
node server.js
```
Server runs on `http://localhost:3030`

**Terminal 2 - Start the development server:**
```bash
cd client
npm run dev
```
Client runs on `http://localhost:5173`


## 🔌 API Endpoints

### Authentication
- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `GET /users/logout` - User logout

### Cryptocurrencies
- `GET /data/traders` - Get all traders
- `GET /data/positions` - Get positions of any trader or the user

### Trading
- `POST /data/positions` - Create new position
- `PATCH /data/positions/:id` - Update position
- `DELETE /data/positions/:id` - Delete position

### Social Features
- `GET /data/followed` - Get user's following list
- `POST /data/followed` - Follow a trader
- `DELETE /data/followed/:id` - Unfollow a trader

## 📝 Configuration

The application uses environment variables for API configuration. Default backend URL is `http://localhost:3030`.

## 🤝 Contributing

This is a SoftUni React exam project.

## 📄 License

This project is part of SoftUni React course.

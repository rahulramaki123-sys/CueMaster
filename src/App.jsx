import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Tables from "./pages/Tables";
import GameHistory from "./pages/GameHistory";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

const defaultTables = [
  {
    id: 1,
    name: "T1",
    type: "French",
    rate: 180,
    status: "Available",
  },
  {
    id: 2,
    name: "T2",
    type: "English",
    rate: 180,
    status: "Available",
  },
  {
    id: 3,
    name: "T3",
    type: "French",
    rate: 180,
    status: "Available",
  },
  {
    id: 4,
    name: "T4",
    type: "Small",
    rate: 150,
    status: "Available",
  },
];

const App = () => {
  // ==========================
  // Load saved data
  // ==========================

  const [tables, setTables] = useState(() => {
    const savedTables = localStorage.getItem("cuemaster_tables");

    return savedTables
      ? JSON.parse(savedTables)
      : defaultTables;
  });

  const [revenueToday, setRevenueToday] = useState(() => {
    const savedRevenue = localStorage.getItem("cuemaster_revenue");

    return savedRevenue
      ? Number(savedRevenue)
      : 0;
  });

  const [gamesToday, setGamesToday] = useState(() => {
    const savedGames = localStorage.getItem("cuemaster_games");

    return savedGames
      ? Number(savedGames)
      : 0;
  });

  const [gameHistory, setGameHistory] = useState(() => {
    const savedHistory = localStorage.getItem(
      "cuemaster_game_history"
    );

    return savedHistory
      ? JSON.parse(savedHistory)
      : [];
  });

  // ==========================
  // Save tables
  // ==========================

  useEffect(() => {
    localStorage.setItem(
      "cuemaster_tables",
      JSON.stringify(tables)
    );
  }, [tables]);

  // ==========================
  // Save revenue
  // ==========================

  useEffect(() => {
    localStorage.setItem(
      "cuemaster_revenue",
      revenueToday.toString()
    );
  }, [revenueToday]);

  // ==========================
  // Save games count
  // ==========================

  useEffect(() => {
    localStorage.setItem(
      "cuemaster_games",
      gamesToday.toString()
    );
  }, [gamesToday]);

  // ==========================
  // Save game history
  // ==========================

  useEffect(() => {
    localStorage.setItem(
      "cuemaster_game_history",
      JSON.stringify(gameHistory)
    );
  }, [gameHistory]);

  return <AppContent
    tables={tables}
    setTables={setTables}
    revenueToday={revenueToday}
    setRevenueToday={setRevenueToday}
    gamesToday={gamesToday}
    setGamesToday={setGamesToday}
    gameHistory={gameHistory}
    setGameHistory={setGameHistory}
  />;
};

// ==========================================
// App Content
// ==========================================

const AppContent = ({
  tables,
  setTables,
  revenueToday,
  setRevenueToday,
  gamesToday,
  setGamesToday,
  gameHistory,
  setGameHistory,
}) => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}

      <Routes>

        {/* ==========================
            Login
        ========================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ==========================
            Home
        ========================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* ==========================
            Dashboard
        ========================== */}

        <Route
          path="/dashboard"
          element={
            <Dashboard
              tables={tables}
              setTables={setTables}

              revenueToday={revenueToday}
              setRevenueToday={setRevenueToday}

              gamesToday={gamesToday}
              setGamesToday={setGamesToday}

              setGameHistory={setGameHistory}
            />
          }
        />

        {/* ==========================
            Tables
        ========================== */}

        <Route
          path="/tables"
          element={
            <Tables
              tables={tables}
              setTables={setTables}
            />
          }
        />

        {/* ==========================
            Game History
        ========================== */}

        <Route
          path="/history"
          element={
            <GameHistory
              gameHistory={gameHistory}
            />
          }
        />

        {/* ==========================
            Customers
        ========================== */}

        <Route
          path="/customers"
          element={
            <Customers
              gameHistory={gameHistory}
            />
          }
        />

        {/* ==========================
            Reports
        ========================== */}

        <Route
          path="/reports"
          element={
            <Reports
              gameHistory={gameHistory}
              revenueToday={revenueToday}
              gamesToday={gamesToday}
            />
          }
        />

      </Routes>
    </>
  );
};

export default App;
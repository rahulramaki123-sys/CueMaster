import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Tables from "./pages/Tables";
import GameHistory from "./pages/GameHistory";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";

const App = () => {
  // Shared table state
  const [tables, setTables] = useState([
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
  ]);

  // Dashboard statistics
  const [revenueToday, setRevenueToday] = useState(0);
  const [gamesToday, setGamesToday] = useState(0);

  // Completed game records
  const [gameHistory, setGameHistory] = useState([]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

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

        <Route
  path="/tables"
  element={
    <Tables
      tables={tables}
      setTables={setTables}
    />
  }
/>

        <Route
          path="/history"
          element={
            <GameHistory gameHistory={gameHistory} />
          }
        />

        <Route
  path="/customers"
  element={
    <Customers gameHistory={gameHistory} />
  }
  
/>
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
import { useState } from "react";

import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import RunningTables from "../components/RunningTables";
import TableCard from "../components/TableCard";
import StartGameModal from "../components/StartGameModal";
import CheckoutModal from "../components/CheckoutModal";


const Dashboard = ({
  tables,
  setTables,
  revenueToday,
  setRevenueToday,
  gamesToday,
  setGamesToday,
  setGameHistory,
}) => {

  const [selectedTable, setSelectedTable] = useState(null);

  const [checkoutTable, setCheckoutTable] = useState(null);

  const [customerName, setCustomerName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [endTime, setEndTime] = useState(null);
  

  const runningTables = tables.filter(
    (table) => table.status === "Running"
  ).length;

  const availableTables = tables.filter(
    (table) => table.status === "Available"
  ).length;
  // ==========================
// Start Game
// ==========================

const handleStartGame = (id) => {

  const table = tables.find(
    (table) => table.id === id
  );

  setSelectedTable(table);

};

// ==========================
// Confirm Start Game
// ==========================

const handleConfirmStart = (e) => {

  e.preventDefault();

  if (
    !customerName.trim() ||
    !phoneNumber.trim()
  ) {

    alert(
      "Please enter customer name and phone number."
    );

    return;

  }

  const updatedTables = tables.map((table) => {

    if (table.id === selectedTable.id) {

      return {

        ...table,

        status: "Running",

        customerName,

        phoneNumber,

        startTime: new Date(),

      };

    }

    return table;

  });

  setTables(updatedTables);

  setSelectedTable(null);

  setCustomerName("");

  setPhoneNumber("");

};

// ==========================
// Cancel Start
// ==========================

const handleCancel = () => {

  setSelectedTable(null);

  setCustomerName("");

  setPhoneNumber("");

};

// ==========================
// Stop Game
// ==========================

const handleStopGame = (id) => {

  const table = tables.find(
    (table) => table.id === id
  );

  if (!table) return;

  setCheckoutTable(table);

  setEndTime(new Date());

};

// ==========================
// Cancel Checkout
// ==========================

const handleCancelCheckout = () => {

  setCheckoutTable(null);

  setEndTime(null);

};

// ==========================
// Duration
// ==========================

const getDurationSeconds = () => {

  if (
    !checkoutTable?.startTime ||
    !endTime
  ) {

    return 0;

  }

  return Math.floor(
    (
      endTime -
      new Date(checkoutTable.startTime)
    ) / 1000
  );

};

const formatDuration = (seconds) => {

  const hours = Math.floor(seconds / 3600);

  const minutes = Math.floor(
    (seconds % 3600) / 60
  );

  const remainingSeconds =
    seconds %   60;

  return `${hours}h ${minutes}m ${remainingSeconds}s`;

};

const durationSeconds =
  getDurationSeconds();

const tableCharge = checkoutTable
  ? (durationSeconds / 3600) *
    checkoutTable.rate
  : 0;
  // ==========================
// Complete Game
// ==========================

const handleCompleteGame = () => {

  if (!checkoutTable) return;

  // Create completed game record
  const completedGame = {

    id: Date.now(),

    tableName: checkoutTable.name,

    tableType: checkoutTable.type,

    customerName: checkoutTable.customerName,

    phoneNumber: checkoutTable.phoneNumber,

    startTime: checkoutTable.startTime,

    endTime,

    durationSeconds,

    rate: checkoutTable.rate,

    charge: tableCharge,

  };


  // Save game to history
  setGameHistory((previous) => [
    completedGame,
    ...previous,
  ]);


  // Update dashboard statistics
  setRevenueToday((previous) =>
    previous + tableCharge
  );

  setGamesToday((previous) =>
    previous + 1
  );


  // Make table available again
  const updatedTables = tables.map((table) => {

    if (table.id === checkoutTable.id) {

      return {

        ...table,

        status: "Available",

        customerName: "",

        phoneNumber: "",

        startTime: null,

      };

    }

    return table;

  });


  setTables(updatedTables);


  // Close checkout modal
  setCheckoutTable(null);

  setEndTime(null);

};
// ==========================
// UI
// ==========================

return (

  <>

    <DashboardHeader />


    <DashboardStats
      revenueToday={revenueToday}
      runningTables={runningTables}
      availableTables={availableTables}
      gamesToday={gamesToday}
    />
    <RunningTables tables={tables} />


    <div className="d-flex justify-content-between align-items-center mb-3">

      <h3 className="fw-bold">

        <i className="bi bi-grid-fill text-success me-2"></i>

        Table Status

      </h3>


      <span className="badge bg-success">

        {runningTables} Running

      </span>

    </div>


    <div className="row">

      {tables.map((table) => (

        <div
          key={table.id}
          className="col-lg-3 col-md-6 mb-4"
        >

          <TableCard
            table={table}
            onStartGame={handleStartGame}
            onStopGame={handleStopGame}
          />

        </div>

      ))}

    </div>


    {/* ==========================
        Start Game Modal
    ========================== */}

    {selectedTable && (

      <StartGameModal
        selectedTable={selectedTable}
        customerName={customerName}
        phoneNumber={phoneNumber}
        setCustomerName={setCustomerName}
        setPhoneNumber={setPhoneNumber}
        onCancel={handleCancel}
        onConfirm={handleConfirmStart}
      />

    )}


    {/* ==========================
        Checkout Modal
    ========================== */}

    <CheckoutModal
      checkoutTable={checkoutTable}
      endTime={endTime}
      durationSeconds={durationSeconds}
      tableCharge={tableCharge}
      formatDuration={formatDuration}
      onCancel={handleCancelCheckout}
      onComplete={handleCompleteGame}
    />


  </>

);
};

export default Dashboard;


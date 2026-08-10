import { useState } from "react";

import RevenueChart from "../components/RevenueChart";
import GamesChart from "../components/GamesChart";
import TableUsageChart from "../components/TableUsageChart";

const Reports = ({
  gameHistory,
}) => {

  // ==========================
  // Report period
  // ==========================

  const [period, setPeriod] = useState("today");


  // ==========================
  // Filter games by period
  // ==========================

  const getFilteredHistory = () => {

    if (period === "all") {
      return gameHistory;
    }

    const now = new Date();

    const startDate = new Date(now);

    if (period === "today") {

      startDate.setHours(0, 0, 0, 0);

    } else if (period === "week") {

      const day = startDate.getDay();

      const difference = day === 0 ? 6 : day - 1;

      startDate.setDate(
        startDate.getDate() - difference
      );

      startDate.setHours(0, 0, 0, 0);

    } else if (period === "month") {

      startDate.setDate(1);

      startDate.setHours(0, 0, 0, 0);
    }

    return gameHistory.filter((game) => {

      const gameDate = new Date(game.endTime);

      return gameDate >= startDate;
    });
  };


  const filteredHistory = getFilteredHistory();


  // ==========================
  // Period label
  // ==========================

  const periodLabels = {
    today: "Today",
    week: "This Week",
    month: "This Month",
    all: "All Time",
  };


  // ==========================
  // Revenue
  // ==========================

  const filteredRevenue = filteredHistory.reduce(
    (sum, game) =>
      sum + Number(game.charge || 0),
    0
  );


  // ==========================
  // Games
  // ==========================

  const filteredGames = filteredHistory.length;


  // ==========================
  // Customers
  // ==========================

  const totalCustomers = new Set(
    filteredHistory.map(
      (game) => game.phoneNumber
    )
  ).size;


  // ==========================
  // Average Bill
  // ==========================

  const averageBill =
    filteredHistory.length > 0
      ? filteredRevenue / filteredHistory.length
      : 0;


  // ==========================
  // Top Customer
  // ==========================

  const customerTotals = {};

  filteredHistory.forEach((game) => {

    const name =
      game.customerName || "Unknown";

    if (!customerTotals[name]) {
      customerTotals[name] = 0;
    }

    customerTotals[name] += Number(
      game.charge || 0
    );
  });


  const topCustomer =
    Object.entries(customerTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];


  // ==========================
  // Most Used Table
  // ==========================

  const tableUsage = {};

  filteredHistory.forEach((game) => {

    const tableName =
      game.tableName || "Unknown";

    if (!tableUsage[tableName]) {
      tableUsage[tableName] = 0;
    }

    tableUsage[tableName]++;
  });


  const mostUsedTable =
    Object.entries(tableUsage).sort(
      (a, b) => b[1] - a[1]
    )[0];


  // ==========================
  // Report Card
  // ==========================

  const ReportCard = ({
    title,
    value,
    icon,
    color,
  }) => {

    return (
      <div className="col-lg-4 col-md-6 mb-4">

        <div className="card border-0 shadow-sm h-100">

          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <p className="text-muted mb-2">
                  {title}
                </p>

                <h2
                  className={`fw-bold text-${color} mb-0`}
                >
                  {value}
                </h2>

              </div>

              <div className="fs-1">
                {icon}
              </div>

            </div>

          </div>

        </div>

      </div>
    );
  };


  return (

    <div className="container mt-4">

      {/* ==========================
          Header
      ========================== */}

      <div className="dashboard-header shadow-sm mb-4">

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

          <div>

            <h2 className="text-white fw-bold mb-1">

              <i className="bi bi-bar-chart-fill me-2"></i>

              Reports Dashboard

            </h2>

            <p className="text-light mb-0">

              Business overview of your snooker club.

            </p>

          </div>


          {/* Period Filter */}

          <select
            className="form-select"
            value={period}
            onChange={(e) =>
              setPeriod(e.target.value)
            }
            style={{
              width: "160px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >

            <option value="today">
              Today
            </option>

            <option value="week">
              This Week
            </option>

            <option value="month">
              This Month
            </option>

            <option value="all">
              All Time
            </option>

          </select>

        </div>

      </div>


      {/* ==========================
          Report Cards
      ========================== */}

      <div className="row">

        <ReportCard
          title={`Revenue • ${periodLabels[period]}`}
          value={`₹${filteredRevenue.toFixed(2)}`}
          icon="💰"
          color="success"
        />

        <ReportCard
          title={`Games • ${periodLabels[period]}`}
          value={filteredGames}
          icon="🎮"
          color="primary"
        />

        <ReportCard
          title={`Customers • ${periodLabels[period]}`}
          value={totalCustomers}
          icon="👥"
          color="warning"
        />

        <ReportCard
          title="Average Bill"
          value={`₹${averageBill.toFixed(2)}`}
          icon="🧾"
          color="info"
        />

        <ReportCard
          title="Top Customer"
          value={
            topCustomer
              ? topCustomer[0]
              : "N/A"
          }
          icon="🏆"
          color="danger"
        />

        <ReportCard
          title="Most Used Table"
          value={
            mostUsedTable
              ? mostUsedTable[0]
              : "N/A"
          }
          icon="🎱"
          color="secondary"
        />

      </div>


      {/* ==========================
          Revenue Chart
      ========================== */}

      <div className="row mb-4">

        <div className="col-12">

          <RevenueChart
            gameHistory={filteredHistory}
          />

        </div>

      </div>


      {/* ==========================
          Games Chart
      ========================== */}

      <div className="row mb-4">

        <div className="col-12">

          <GamesChart
            gameHistory={filteredHistory}
          />

        </div>

      </div>


      {/* ==========================
          Table Usage Chart
      ========================== */}

      <div className="row mb-4">

        <div className="col-12">

          <TableUsageChart
            gameHistory={filteredHistory}
          />

        </div>

      </div>

    </div>
  );
};


export default Reports;
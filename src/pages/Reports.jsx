import RevenueChart from "../components/RevenueChart";
const Reports = ({
  gameHistory,
  revenueToday,
  gamesToday,
}) => {

  // Total Customers
  const totalCustomers = new Set(
    gameHistory.map((game) => game.phoneNumber)
  ).size;

  // Average Bill
  const averageBill =
    gameHistory.length > 0
      ? gameHistory.reduce(
          (sum, game) => sum + Number(game.charge || 0),
          0
        ) / gameHistory.length
      : 0;

  // Customer Spending
  const customerTotals = {};

  gameHistory.forEach((game) => {
    const name = game.customerName || "Unknown";

    if (!customerTotals[name]) {
      customerTotals[name] = 0;
    }

    customerTotals[name] += Number(game.charge || 0);
  });

  const topCustomer = Object.entries(customerTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // Table Usage
  const tableUsage = {};

  gameHistory.forEach((game) => {
    const tableName = game.tableName || "Unknown";

    if (!tableUsage[tableName]) {
      tableUsage[tableName] = 0;
    }

    tableUsage[tableName]++;
  });

  const mostUsedTable = Object.entries(tableUsage).sort(
    (a, b) => b[1] - a[1]
  )[0];

  // Report Card
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

                <h2 className={`fw-bold text-${color} mb-0`}>
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

      {/* Header */}
      <div className="dashboard-header shadow-sm mb-4">

        <h2 className="text-white fw-bold">
          <i className="bi bi-bar-chart-fill me-2"></i>
          Reports Dashboard
        </h2>

        <p className="text-light mb-0">
          Business overview of your snooker club.
        </p>

      </div>


      {/* Report Cards */}
      <div className="row">

        <ReportCard
          title="Revenue Today"
          value={`₹${Number(revenueToday || 0).toFixed(2)}`}
          icon="💰"
          color="success"
        />

        <ReportCard
          title="Games Today"
          value={gamesToday}
          icon="🎮"
          color="primary"
        />

        <ReportCard
          title="Customers"
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

{/* Revenue Chart */}

<div className="row mt-2 mb-4">

  <div className="col-12">

    <RevenueChart
      gameHistory={gameHistory}
    />

  </div>

</div>

    </div>
  );
};

export default Reports;
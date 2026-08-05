const Reports = ({
  gameHistory,
  revenueToday,
  gamesToday,
}) => {

  const totalCustomers = new Set(
    gameHistory.map((game) => game.phoneNumber)
  ).size;

  const averageBill =
    gameHistory.length > 0
      ? gameHistory.reduce(
          (sum, game) => sum + game.charge,
          0
        ) / gameHistory.length
      : 0;

  // Top Customer
  const customerTotals = {};

  gameHistory.forEach((game) => {
    if (!customerTotals[game.customerName]) {
      customerTotals[game.customerName] = 0;
    }

    customerTotals[game.customerName] += game.charge;
  });

  const topCustomer =
    Object.entries(customerTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

  // Most Used Table
  const tableUsage = {};

  gameHistory.forEach((game) => {
    if (!tableUsage[game.tableName]) {
      tableUsage[game.tableName] = 0;
    }

    tableUsage[game.tableName]++;
  });

  const mostUsedTable =
    Object.entries(tableUsage).sort(
      (a, b) => b[1] - a[1]
    )[0];

  const ReportCard = ({
    title,
    value,
    icon,
    color,
  }) => (

    <div className="col-lg-4 col-md-6 mb-4">

      <div className="card border-0 shadow-sm h-100">

        <div className="card-body">

          <div className="d-flex justify-content-between">

            <div>

              <p className="text-muted mb-2">
                {title}
              </p>

              <h2 className={`fw-bold text-${color}`}>
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

  return (

    <div className="container mt-4">

      <div className="dashboard-header shadow-sm mb-4">

        <h2 className="text-white fw-bold">

          <i className="bi bi-bar-chart-fill me-2"></i>

          Reports Dashboard

        </h2>

        <p className="text-light mb-0">

          Business overview of your snooker club.

        </p>

      </div>

      <div className="row">

        <ReportCard
          title="Revenue Today"
          value={`₹${revenueToday.toFixed(2)}`}
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

    </div>

  );

};

export default Reports;
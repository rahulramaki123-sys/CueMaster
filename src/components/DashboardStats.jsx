import SummaryCard from "./SummaryCard";

const DashboardStats = ({
  revenueToday,
  runningTables,
  availableTables,
  gamesToday,
}) => {

  return (

    <div className="row mb-4">

      <div className="col-lg-3 col-md-6 mb-3">

        <SummaryCard
          title="Revenue Today"
          value={`₹${revenueToday.toFixed(2)}`}
          subtitle="Today's Earnings"
          icon={<i className="bi bi-cash-stack"></i>}
        />

      </div>

      <div className="col-lg-3 col-md-6 mb-3">

        <SummaryCard
          title="Running Tables"
          value={runningTables}
          subtitle="Currently Playing"
          icon={<i className="bi bi-controller"></i>}
        />

      </div>

      <div className="col-lg-3 col-md-6 mb-3">

        <SummaryCard
          title="Available Tables"
          value={availableTables}
          subtitle="Ready To Play"
          icon={<i className="bi bi-check2-circle"></i>}
        />

      </div>

      <div className="col-lg-3 col-md-6 mb-3">

        <SummaryCard
          title="Games Today"
          value={gamesToday}
          subtitle="Completed Today"
          icon={<i className="bi bi-trophy-fill"></i>}
        />

      </div>

    </div>

  );

};

export default DashboardStats;
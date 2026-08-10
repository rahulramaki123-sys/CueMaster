import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const RevenueChart = ({ gameHistory }) => {

  // Group revenue by date
  const revenueByDate = {};

  gameHistory.forEach((game) => {
    const date = new Date(game.endTime).toLocaleDateString();

    if (!revenueByDate[date]) {
      revenueByDate[date] = 0;
    }

    revenueByDate[date] += Number(game.charge || 0);
  });

  // Convert grouped data into chart format
  const revenueData = Object.entries(revenueByDate).map(
    ([date, revenue]) => ({
      date,
      revenue,
    })
  );

  return (
    <div className="card border-0 shadow-sm h-100">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <div>
            <h5 className="fw-bold mb-1">
              Revenue
            </h5>

            <p className="text-muted mb-0">
              Daily revenue from completed games
            </p>
          </div>

          <div className="fs-3">
            💰
          </div>

        </div>

        {revenueData.length === 0 ? (

          <div className="text-center text-muted py-5">

            <div className="fs-1 mb-2">
              📊
            </div>

            <p className="mb-0">
              No revenue data available yet.
            </p>

          </div>

        ) : (

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={revenueData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toFixed(2)}`,
                  "Revenue",
                ]}
              />

              <Bar
                dataKey="revenue"
                fill="#198754"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        )}

      </div>

    </div>
  );
};

export default RevenueChart;
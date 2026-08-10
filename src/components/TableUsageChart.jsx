import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const TableUsageChart = ({ gameHistory }) => {

  // Count completed games for each table
  const tableUsage = {};

  gameHistory.forEach((game) => {
    if (!tableUsage[game.tableName]) {
      tableUsage[game.tableName] = 0;
    }

    tableUsage[game.tableName]++;
  });

  // Convert object into chart data
  const tableData = Object.entries(tableUsage)
    .map(([table, games]) => ({
      table,
      games,
    }))
    .sort((a, b) => b.games - a.games);

  return (
    <div className="card border-0 shadow-sm h-100">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-3">

          <div>
            <h5 className="fw-bold mb-1">
              Table Usage
            </h5>

            <p className="text-muted mb-0">
              Completed games by table
            </p>
          </div>

          <div className="fs-3">
            🎱
          </div>

        </div>

        {tableData.length === 0 ? (

          <div className="text-center text-muted py-5">

            <div className="fs-1 mb-2">
              🎱
            </div>

            <p className="mb-0">
              No table usage data available yet.
            </p>

          </div>

        ) : (

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={tableData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="table" />

              <YAxis allowDecimals={false} />

              <Tooltip
                formatter={(value) => [
                  value,
                  "Games",
                ]}
              />

              <Bar
                dataKey="games"
                fill="#6f42c1"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        )}

      </div>

    </div>
  );
};

export default TableUsageChart;
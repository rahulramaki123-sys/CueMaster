import { useEffect, useState } from "react";

const TableCard = ({ table, onStartGame, onStopGame }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update timer every second while game is running
  useEffect(() => {
    if (table.status !== "Running" || !table.startTime) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [table.status, table.startTime]);

  // Format start time
  const formatStartTime = (startTime) => {
    if (!startTime) {
      return "";
    }

    return new Date(startTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate elapsed time
  const getElapsedTime = () => {
    if (!table.startTime) {
      return "00:00:00";
    }

    const start = new Date(table.startTime);
    const difference = currentTime - start;

    const totalSeconds = Math.max(
      0,
      Math.floor(difference / 1000)
    );

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const isRunning = table.status === "Running";

  return (
    <div
      className={`card border-0 shadow-sm h-100 ${
        isRunning ? "table-running" : "table-available"
      }`}
    >
      <div className="card-body p-4 d-flex flex-column">

        {/* Table Header */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h4 className="fw-bold mb-1 text-success">
    🎱 {table.name}
</h4>

            <span
    className="badge rounded-pill bg-dark"
>
    {table.type}
</span>
          </div>

          <span
            className={`badge rounded-pill ${
              isRunning
                ? "bg-danger-subtle text-danger"
                : "bg-success-subtle text-success"
            }`}
          >
            {isRunning ? "● Running" : "● Available"}
          </span>
        </div>

        {/* Rate */}
        <div className="mb-3">
          <small className="text-uppercase text-muted">
    Hourly Rate
</small>
<span
    className="fs-4 fw-bold text-success"
>
            ₹{table.rate}
            <small className="text-muted fs-6">
              {" "}/ hour
            </small>
          </span>
        </div>

        {/* Running Game Information */}
        {isRunning && table.startTime && (
          <div className="running-info rounded-3 p-3 mb-3">

            <div className="mb-2">
              <small className="text-muted d-block">
                Customer
              </small>

              <span className="fw-semibold">
                {table.customerName || "Guest"}
              </span>
            </div>

            <div className="mb-3">
              <small className="text-muted d-block">
                Started At
              </small>

              <span>
                {formatStartTime(table.startTime)}
              </span>
            </div>

            <div className="text-center">
              <small className="text-muted">
                🟢 LIVE TIMER
              </small>

              <h2 className="fw-bold mb-0 mt-1">
                {getElapsedTime()}
              </h2>
            </div>

          </div>
        )}

        {/* Push button to bottom */}
        <div className="mt-auto">

          {isRunning ? (
            <button
              className="btn btn-danger w-100 py-2 fw-semibold"
              onClick={() => onStopGame(table.id)}
            >
           ■ Checkout
            </button>
          ) : (
            <button
              className="btn btn-success w-100 py-2 fw-semibold"
              onClick={() => onStartGame(table.id)}
            >
             ▶ Start Game
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default TableCard;
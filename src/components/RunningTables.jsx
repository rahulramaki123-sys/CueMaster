import { useEffect, useState } from "react";

const RunningTables = ({ tables }) => {
  const runningTables = tables.filter(
    (table) => table.status === "Running"
  );

  // Re-render every second so running time stays live
  const [, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    if (!time) return "-";

    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRunningTime = (startTime) => {
    if (!startTime) return "0m";

    const seconds = Math.floor(
      (new Date() - new Date(startTime)) / 1000
    );

    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor(
      (seconds % 3600) / 60
    );

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
  };

  if (runningTables.length === 0) {
    return (
      <div className="card shadow-sm mb-4">
        <div className="card-body text-center py-4">

          <i className="bi bi-clock-history fs-2 text-muted"></i>

          <h6 className="mt-2 mb-1">
            No Active Games
          </h6>

          <p className="text-muted mb-0">
            No tables are currently running.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm mb-4">

      <div className="card-header bg-white d-flex justify-content-between align-items-center">

        <h5 className="mb-0 fw-bold">
          <i className="bi bi-play-circle-fill text-success me-2"></i>
          Live Running Tables
        </h5>

        <span className="badge bg-success">
          {runningTables.length} Live
        </span>

      </div>

      <div className="card-body">

        <div className="row">

          {runningTables.map((table) => (

            <div
              key={table.id}
              className="col-lg-6 mb-3"
            >

              <div className="border rounded p-3">

                <div className="d-flex justify-content-between align-items-start">

                  <div>

                    <h6 className="fw-bold mb-1">

                      <i className="bi bi-circle-fill text-success me-2"></i>

                      {table.name}

                    </h6>

                    <div className="text-muted small">
                      {table.type} Table
                    </div>

                  </div>

                  <span className="badge bg-success">
                    Running
                  </span>

                </div>

                <hr />

                <div className="row">

                  <div className="col-6">

                    <small className="text-muted">
                      Customer
                    </small>

                    <div className="fw-semibold">
                      {table.customerName || "-"}
                    </div>

                  </div>

                  <div className="col-6">

                    <small className="text-muted">
                      Started
                    </small>

                    <div className="fw-semibold">
                      {formatTime(table.startTime)}
                    </div>

                  </div>

                </div>

                <div className="mt-3">

                  <small className="text-muted">
                    Running Time
                  </small>

                  <div className="fw-bold text-success fs-5">
                    {getRunningTime(table.startTime)}
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default RunningTables;
import { useState } from "react";

const GameHistory = ({ gameHistory }) => {

  const [search, setSearch] = useState("");

  const formatTime = (time) =>
    new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDate = (time) =>
    new Date(time).toLocaleDateString();

  const formatDuration = (seconds) => {

    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor(
      (seconds % 3600) / 60
    );

    const remaining = seconds % 60;

    return `${hours}h ${minutes}m ${remaining}s`;

  };

  const filteredGames = gameHistory.filter((game) =>

    game.customerName
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    game.phoneNumber.includes(search) ||

    game.tableName
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  const totalRevenue = gameHistory.reduce(

    (sum, game) => sum + game.charge,

    0

  );

  const averageBill =
    gameHistory.length > 0
      ? totalRevenue / gameHistory.length
      : 0;

  return (

    <div className="container mt-4">

      {/* Header */}

      <div className="dashboard-header shadow-sm mb-4">

        <h2 className="fw-bold text-white">

          <i className="bi bi-clock-history me-2"></i>

          Game History

        </h2>

        <p className="text-light mb-0">

          View completed games and billing history.

        </p>

      </div>

      {/* Search */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

          <div className="input-group">

            <span className="input-group-text">

              <i className="bi bi-search"></i>

            </span>

            <input
              className="form-control"
              placeholder="Search customer, phone or table..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="row mb-4">

        <div className="col-md-4 mb-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <p className="text-muted">

                Games Played

              </p>

              <h2>

                {gameHistory.length}

              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <p className="text-muted">

                Total Revenue

              </p>

              <h2 className="text-success">

                ₹{totalRevenue.toFixed(2)}

              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <p className="text-muted">

                Average Bill

              </p>

              <h2>

                ₹{averageBill.toFixed(2)}

              </h2>

            </div>

          </div>

        </div>

      </div>

      {gameHistory.length === 0 ? (

        <div className="card border-0 shadow-sm">

          <div className="card-body text-center py-5">

            <i className="bi bi-clock-history fs-1 text-success"></i>

            <h4 className="mt-3">

              No Games Yet

            </h4>

            <p className="text-muted">

              Completed games will appear here.

            </p>

          </div>

        </div>

      ) : (

        <div className="card border-0 shadow-sm">

          <div className="card-body">

            <div className="table-responsive">

              <table className="table align-middle">

                <thead>

                  <tr>

                    <th>Customer</th>

                    <th>Table</th>

                    <th>Date</th>

                    <th>Duration</th>

                    <th>Amount</th>

                    <th></th>

                  </tr>

                </thead>

                <tbody>

                  {filteredGames.map((game) => (

                    <tr key={game.id}>

                      <td>

                        <strong>

                          {game.customerName}

                        </strong>

                        <br />

                        <small className="text-muted">

                          {game.phoneNumber}

                        </small>

                      </td>

                      <td>

                        <span className="badge bg-dark">

                          {game.tableName}

                        </span>

                        <br />

                        <small>

                          {game.tableType}

                        </small>

                      </td>

                      <td>

                        {formatDate(game.endTime)}

                        <br />

                        <small className="text-muted">

                          {formatTime(game.startTime)}

                          {" - "}

                          {formatTime(game.endTime)}

                        </small>

                      </td>

                      <td>

                        {formatDuration(
                          game.durationSeconds
                        )}

                      </td>

                      <td>

                        <strong className="text-success">

                          ₹{game.charge.toFixed(2)}

                        </strong>

                      </td>

                      <td>

                        <button className="btn btn-outline-success btn-sm">

                          <i className="bi bi-receipt"></i>

                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default GameHistory;
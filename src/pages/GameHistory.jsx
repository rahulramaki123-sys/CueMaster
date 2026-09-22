import { useState } from "react";

import ReceiptModal from "../components/ReceiptModal";

const GameHistory = ({ gameHistory }) => {

  const [search, setSearch] = useState("");

  const [selectedReceipt, setSelectedReceipt] =
    useState(null);


  // ==========================
  // Format Time
  // ==========================

  const formatTime = (time) =>
    new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });


  // ==========================
  // Format Date
  // ==========================

  const formatDate = (time) =>
    new Date(time).toLocaleDateString();


  // ==========================
  // Format Duration
  // ==========================

  const formatDuration = (seconds) => {

    const hours = Math.floor(
      seconds / 3600
    );

    const minutes = Math.floor(
      (seconds % 3600) / 60
    );

    const remaining = seconds % 60;

    return `${hours}h ${minutes}m ${remaining}s`;
  };


  // ==========================
  // Search
  // ==========================

  const searchText = search
    .trim()
    .toLowerCase();

  const filteredGames = gameHistory.filter(
    (game) => {

      const customerName =
        game.customerName?.toLowerCase() || "";

      const phoneNumber =
        game.phoneNumber?.toString() || "";

      const tableName =
        game.tableName?.toLowerCase() || "";

      return (
        customerName.includes(searchText) ||
        phoneNumber.includes(searchText) ||
        tableName.includes(searchText)
      );
    }
  );


  // ==========================
  // Statistics
  // ==========================

  const totalRevenue = gameHistory.reduce(
    (sum, game) =>
      sum + Number(game.charge || 0),
    0
  );


  const averageBill =
    gameHistory.length > 0
      ? totalRevenue / gameHistory.length
      : 0;


  // ==========================
  // View Receipt
  // ==========================

  const handleViewReceipt = (game) => {

    const receipt = {

      receiptNumber:
        `CM-${game.id}`,

      tableName:
        game.tableName,

      tableType:
        game.tableType,

      customerName:
        game.customerName,

      phoneNumber:
        game.phoneNumber,

      startTime:
        game.startTime,

      endTime:
        game.endTime,

      duration:
        formatDuration(
          game.durationSeconds
        ),

      rate:
        game.rate,

      charge:
        game.charge,

    };

    setSelectedReceipt(receipt);
  };


  return (

    <div className="container mt-4">

      {/* ==========================
          Header
      ========================== */}

      <div className="dashboard-header shadow-sm mb-4">

        <h2 className="fw-bold text-white">

          <i className="bi bi-clock-history me-2"></i>

          Game History

        </h2>

        <p className="text-light mb-0">

          View completed games and billing history.

        </p>

      </div>


      {/* ==========================
          Search
      ========================== */}

      <div className="card border-0 shadow-sm mb-4">

        <div className="card-body">

          <div className="input-group">

            <span className="input-group-text">

              <i className="bi bi-search"></i>

            </span>

            <input
              type="text"
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


      {/* ==========================
          Statistics
      ========================== */}

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


      {/* ==========================
          No Games
      ========================== */}

      {gameHistory.length === 0 ? (

        <div className="card border-0 shadow-sm">

          <div className="card-body text-center py-5">

            <i className="bi bi-clock-history fs-1 text-success"></i>

            <h4 className="mt-3">
              No Games Yet
            </h4>

            <p className="text-muted mb-0">

              Completed games will appear here.

            </p>

          </div>

        </div>

      ) : filteredGames.length === 0 ? (

        /* ==========================
           No Search Results
        ========================== */

        <div className="card border-0 shadow-sm">

          <div className="card-body text-center py-5">

            <i className="bi bi-search fs-1 text-muted"></i>

            <h4 className="mt-3">
              No Matching Games
            </h4>

            <p className="text-muted mb-0">

              No games match your search.
              Try a different customer, phone number or table.

            </p>

          </div>

        </div>

      ) : (

        /* ==========================
           Game Table
        ========================== */

        <div className="card border-0 shadow-sm">

          <div className="card-body">

            <div className="table-responsive">

              <table className="table align-middle">

                <thead>

                  <tr>

                    <th>
                      Customer
                    </th>

                    <th>
                      Table
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Duration
                    </th>

                    <th>
                      Amount
                    </th>

                    <th>
                      Receipt
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredGames.map((game) => (

                    <tr key={game.id}>

                      {/* Customer */}

                      <td>

                        <strong>
                          {game.customerName}
                        </strong>

                        <br />

                        <small className="text-muted">

                          {game.phoneNumber}

                        </small>

                      </td>


                      {/* Table */}

                      <td>

                        <span className="badge bg-dark">

                          {game.tableName}

                        </span>

                        <br />

                        <small>

                          {game.tableType}

                        </small>

                      </td>


                      {/* Date */}

                      <td>

                        {formatDate(
                          game.endTime
                        )}

                        <br />

                        <small className="text-muted">

                          {formatTime(
                            game.startTime
                          )}

                          {" - "}

                          {formatTime(
                            game.endTime
                          )}

                        </small>

                      </td>


                      {/* Duration */}

                      <td>

                        {formatDuration(
                          game.durationSeconds
                        )}

                      </td>


                      {/* Amount */}

                      <td>

                        <strong className="text-success">

                          ₹{Number(
                            game.charge || 0
                          ).toFixed(2)}

                        </strong>

                      </td>


                      {/* Receipt */}

                      <td>

                        <button
                          className="btn btn-outline-success btn-sm"
                          title="View Receipt"
                          onClick={() =>
                            handleViewReceipt(game)
                          }
                        >

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


      {/* ==========================
          Receipt Modal
      ========================== */}

      <ReceiptModal
        receipt={selectedReceipt}
        onClose={() =>
          setSelectedReceipt(null)
        }
      />

    </div>
  );
};


export default GameHistory;
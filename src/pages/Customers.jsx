import { useState } from "react";

const Customers = ({ gameHistory }) => {

  const [search, setSearch] = useState("");


  // ==========================
  // Create Customer Records
  // ==========================

  const customers = Object.values(

    gameHistory.reduce((customerList, game) => {

      const phone = game.phoneNumber;

      if (!phone) {
        return customerList;
      }

      if (customerList[phone]) {

        customerList[phone].games += 1;

        customerList[phone].totalSpent +=
          Number(game.charge || 0);

        if (
          new Date(game.endTime) >
          new Date(customerList[phone].lastPlayed)
        ) {

          customerList[phone].lastPlayed =
            game.endTime;

        }

      } else {

        customerList[phone] = {

          name: game.customerName || "Unknown",

          phone: game.phoneNumber,

          games: 1,

          totalSpent:
            Number(game.charge || 0),

          lastPlayed: game.endTime,

        };

      }

      return customerList;

    }, {})

  );


  // ==========================
  // Sort Latest First
  // ==========================

  customers.sort(

    (a, b) =>

      new Date(b.lastPlayed) -
      new Date(a.lastPlayed)

  );


  // ==========================
  // Search
  // ==========================

  const searchText = search
    .trim()
    .toLowerCase();

  const filteredCustomers =
    customers.filter((customer) => {

      const customerName =
        customer.name?.toLowerCase() || "";

      const customerPhone =
        customer.phone?.toString() || "";

      return (
        customerName.includes(searchText) ||
        customerPhone.includes(searchText)
      );

    });


  // ==========================
  // Statistics
  // ==========================

  const totalRevenue =
    customers.reduce(

      (sum, customer) =>
        sum + customer.totalSpent,

      0

    );


  const totalGames =
    customers.reduce(

      (sum, customer) =>
        sum + customer.games,

      0

    );


  // ==========================
  // Format Date
  // ==========================

  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString();

  };


  return (

    <div className="container mt-4">

      {/* ==========================
          Header
      ========================== */}

      <div className="dashboard-header shadow-sm mb-4">

        <h2 className="text-white fw-bold">

          <i className="bi bi-people-fill me-2"></i>

          Customers

        </h2>

        <p className="text-light mb-0">

          Manage customer activity and spending.

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

              placeholder="Search customer by name or phone..."

              value={search}

              onChange={(e) =>
                setSearch(e.target.value)
              }

            />

          </div>

        </div>

      </div>


      {/* ==========================
          No Customers
      ========================== */}

      {customers.length === 0 ? (

        <div className="card border-0 shadow-sm">

          <div className="card-body text-center py-5">

            <i className="bi bi-people fs-1 text-success"></i>

            <h4 className="mt-3">

              No Customers Yet

            </h4>

            <p className="text-muted mb-0">

              Customers will appear after
              completing games.

            </p>

          </div>

        </div>

      ) : (

        <>

          {/* ==========================
              Statistics
          ========================== */}

          <div className="row mb-4">

            <div className="col-md-4 mb-3">

              <div className="card border-0 shadow-sm">

                <div className="card-body">

                  <p className="text-muted">

                    Total Customers

                  </p>

                  <h2 className="fw-bold">

                    {customers.length}

                  </h2>

                </div>

              </div>

            </div>


            <div className="col-md-4 mb-3">

              <div className="card border-0 shadow-sm">

                <div className="card-body">

                  <p className="text-muted">

                    Total Games

                  </p>

                  <h2 className="fw-bold">

                    {totalGames}

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

                  <h2 className="fw-bold text-success">

                    ₹{totalRevenue.toFixed(2)}

                  </h2>

                </div>

              </div>

            </div>

          </div>


          {/* ==========================
              No Search Results
          ========================== */}

          {filteredCustomers.length === 0 ? (

            <div className="card border-0 shadow-sm">

              <div className="card-body text-center py-5">

                <i className="bi bi-search fs-1 text-muted"></i>

                <h4 className="mt-3">

                  No Matching Customers

                </h4>

                <p className="text-muted mb-0">

                  No customers match your search.
                  Try a different name or phone number.

                </p>

              </div>

            </div>

          ) : (

            /* ==========================
               Customer Table
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
                          Phone
                        </th>

                        <th>
                          Games
                        </th>

                        <th>
                          Total Spent
                        </th>

                        <th>
                          Last Played
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {filteredCustomers.map(
                        (customer) => (

                          <tr
                            key={customer.phone}
                          >

                            {/* Customer */}

                            <td>

                              <div className="d-flex align-items-center">

                                <div

                                  className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3"

                                  style={{
                                    width: "42px",
                                    height: "42px",
                                  }}

                                >

                                  {customer.name
                                    .charAt(0)
                                    .toUpperCase()}

                                </div>

                                <strong>

                                  {customer.name}

                                </strong>

                              </div>

                            </td>


                            {/* Phone */}

                            <td>

                              {customer.phone}

                            </td>


                            {/* Games */}

                            <td>

                              <span className="badge bg-success">

                                {customer.games}

                              </span>

                            </td>


                            {/* Total Spent */}

                            <td>

                              <strong>

                                ₹
                                {customer.totalSpent.toFixed(2)}

                              </strong>

                            </td>


                            {/* Last Played */}

                            <td>

                              {formatDate(
                                customer.lastPlayed
                              )}

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          )}

        </>

      )}

    </div>

  );

};

export default Customers;
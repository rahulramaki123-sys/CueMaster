const CheckoutModal = ({
  checkoutTable,
  endTime,
  durationSeconds,
  tableCharge,
  formatDuration,
  onCancel,
  onComplete,
}) => {

  if (!checkoutTable || !endTime) {
    return null;
  }

  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (time) => {
    return new Date(time).toLocaleDateString();
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0,0,0,.5)",
      }}
    >

      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">

        <div className="modal-content border-0 shadow-lg">

          {/* Header */}

          <div className="modal-header">

            <div>

              <h5 className="modal-title fw-bold">

                🎱 CueMaster

              </h5>

              <small className="text-muted">
                Game Checkout
              </small>

            </div>

            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
            />

          </div>


          {/* Body */}

         <div
  className="modal-body"
  style={{
    maxHeight: "70vh",
  }}
>

            {/* Customer Information */}

            <div className="mb-2">

              <h6 className="fw-bold mb-2">
                Customer Details
              </h6>

              <div className="row">

                <div className="col-6 mb-2">

                  <small className="text-muted">
                    Customer
                  </small>

                  <div className="fw-semibold">
                    {checkoutTable.customerName}
                  </div>

                </div>

                <div className="col-6 mb-2">

                  <small className="text-muted">
                    Phone
                  </small>

                  <div className="fw-semibold">
                    {checkoutTable.phoneNumber}
                  </div>

                </div>

              </div>

            </div>


            <hr />


            {/* Table Information */}

            <div className="mb-2">

              <h6 className="fw-bold mb-2">
                Game Details
              </h6>

              <div className="row">

                <div className="col-6 mb-2">

                  <small className="text-muted">
                    Table
                  </small>

                  <div className="fw-semibold">
                    {checkoutTable.name}
                  </div>

                </div>

                <div className="col-6 mb-2">

                  <small className="text-muted">
                    Table Type
                  </small>

                  <div className="fw-semibold">
                    {checkoutTable.type}
                  </div>

                </div>

                <div className="col-6 mb-2">

                  <small className="text-muted">
                    Date
                  </small>

                  <div className="fw-semibold">
                    {formatDate(endTime)}
                  </div>

                </div>

                <div className="col-6 mb-2">

                  <small className="text-muted">
                    Rate
                  </small>

                  <div className="fw-semibold">
                    ₹{checkoutTable.rate}/hr
                  </div>

                </div>

              </div>

            </div>


            <hr />


            {/* Time Details */}

            <div className="mb-2">

              <h6 className="fw-bold mb-2">
                Time Details
              </h6>

              <div className="row">

                <div className="col-4">

                  <small className="text-muted">
                    Start
                  </small>

                  <div className="fw-semibold">
                    {formatTime(
                      checkoutTable.startTime
                    )}
                  </div>

                </div>

                <div className="col-4">

                  <small className="text-muted">
                    End
                  </small>

                  <div className="fw-semibold">
                    {formatTime(endTime)}
                  </div>

                </div>

                <div className="col-4">

                  <small className="text-muted">
                    Duration
                  </small>

                  <div className="fw-semibold">
                    {formatDuration(
                      durationSeconds
                    )}
                  </div>

                </div>

              </div>

            </div>


            <hr />


            {/* Total */}

            <div className="bg-light rounded p-3">

              <div className="d-flex justify-content-between align-items-center">

                <span className="fw-bold">
                  Total Amount
                </span>

                <span className="text-success fw-bold fs-3">
                  ₹{tableCharge.toFixed(2)}
                </span>

              </div>

            </div>

          </div>


          {/* Footer */}

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              className="btn btn-success"
              onClick={onComplete}
            >

              <i className="bi bi-check-circle-fill me-2"></i>

              Complete Game

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CheckoutModal;
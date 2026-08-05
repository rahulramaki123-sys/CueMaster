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

  return (

    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0,0,0,.5)",
      }}
    >

      <div className="modal-dialog modal-dialog-centered">

        <div className="modal-content border-0 shadow-lg">

          <div className="modal-header">

            <h5 className="modal-title">

              <i className="bi bi-receipt-cutoff text-success me-2"></i>

              Checkout

            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
            />

          </div>

          <div className="modal-body">

            <p>
              <strong>Table:</strong> {checkoutTable.name}
            </p>

            <p>
              <strong>Customer:</strong> {checkoutTable.customerName}
            </p>

            <p>
              <strong>Phone:</strong> {checkoutTable.phoneNumber}
            </p>

            <p>
              <strong>Duration:</strong>{" "}
              {formatDuration(durationSeconds)}
            </p>

            <hr />

            <h3 className="text-success fw-bold">

              ₹{tableCharge.toFixed(2)}

            </h3>

          </div>

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
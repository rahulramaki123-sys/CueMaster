const ReceiptModal = ({
  receipt,
  onClose,
}) => {

  if (!receipt) {
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0,0,0,.5)",
      }}
    >

      <div className="modal-dialog modal-dialog-centered">

        <div
          className="modal-content border-0 shadow-lg"
          id="receipt"
        >

          {/* Receipt Header */}

          <div className="modal-header">

            <div>

              <h4 className="fw-bold mb-1">
                🎱 CueMaster
              </h4>

              <small className="text-muted">
                Snooker Club
              </small>

            </div>

            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            />

          </div>


          {/* Receipt Body */}

          <div className="modal-body">

            <div className="text-center mb-3">

              <h5 className="fw-bold">
                GAME RECEIPT
              </h5>

              <small className="text-muted">
                Receipt #{receipt.receiptNumber}
              </small>

            </div>


            <hr />


            {/* Customer */}

            <h6 className="fw-bold mb-3">
              Customer Details
            </h6>

            <div className="row mb-3">

              <div className="col-6">

                <small className="text-muted">
                  Customer
                </small>

                <div className="fw-semibold">
                  {receipt.customerName}
                </div>

              </div>

              <div className="col-6">

                <small className="text-muted">
                  Phone
                </small>

                <div className="fw-semibold">
                  {receipt.phoneNumber}
                </div>

              </div>

            </div>


            <hr />


            {/* Game Details */}

            <h6 className="fw-bold mb-3">
              Game Details
            </h6>

            <div className="row">

              <div className="col-6 mb-2">

                <small className="text-muted">
                  Table
                </small>

                <div className="fw-semibold">
                  {receipt.tableName}
                </div>

              </div>

              <div className="col-6 mb-2">

                <small className="text-muted">
                  Table Type
                </small>

                <div className="fw-semibold">
                  {receipt.tableType}
                </div>

              </div>

              <div className="col-6 mb-2">

                <small className="text-muted">
                  Date
                </small>

                <div className="fw-semibold">
                  {formatDate(receipt.endTime)}
                </div>

              </div>

              <div className="col-6 mb-2">

                <small className="text-muted">
                  Rate
                </small>

                <div className="fw-semibold">
                  ₹{receipt.rate}/hr
                </div>

              </div>

            </div>


            <hr />


            {/* Time Details */}

            <h6 className="fw-bold mb-3">
              Time Details
            </h6>

            <div className="row">

              <div className="col-4">

                <small className="text-muted">
                  Start
                </small>

                <div className="fw-semibold">
                  {formatTime(receipt.startTime)}
                </div>

              </div>

              <div className="col-4">

                <small className="text-muted">
                  End
                </small>

                <div className="fw-semibold">
                  {formatTime(receipt.endTime)}
                </div>

              </div>

              <div className="col-4">

                <small className="text-muted">
                  Duration
                </small>

                <div className="fw-semibold">
                  {receipt.duration}
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
                  ₹{Number(receipt.charge).toFixed(2)}
                </span>

              </div>

            </div>


            <div className="text-center mt-4">

              <small className="text-muted">
                Thank you for playing at CueMaster! 🎱
              </small>

            </div>

          </div>


          {/* Footer */}

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>

            <button
              className="btn btn-success"
              onClick={handlePrint}
            >

              <i className="bi bi-printer-fill me-2"></i>

              Print Receipt

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ReceiptModal;
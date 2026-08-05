const StartGameModal = ({
  selectedTable,
  customerName,
  setCustomerName,
  phoneNumber,
  setPhoneNumber,
  onCancel,
  onConfirm,
}) => {

  if (!selectedTable) return null;

  return (

    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0,0,0,.5)"
      }}
    >

      <div className="modal-dialog modal-dialog-centered">

        <div className="modal-content border-0 shadow-lg">

          <form onSubmit={onConfirm}>

            <div className="modal-header">

              <h5 className="modal-title">

                <i className="bi bi-play-circle-fill text-success me-2"></i>

                Start Game

              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
              />

            </div>

            <div className="modal-body">

              <div className="alert alert-success">

                <strong>{selectedTable.name}</strong>

                <br />

                {selectedTable.type} Table

                <br />

                ₹{selectedTable.rate}/hour

              </div>

              <div className="mb-3">

                <label className="form-label">

                  Customer Name

                </label>

                <input
                  type="text"
                  className="form-control"
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(e.target.value)
                  }
                  placeholder="Enter customer name"
                />

              </div>

              <div className="mb-3">

                <label className="form-label">

                  Phone Number

                </label>

                <input
                  type="tel"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value)
                  }
                  placeholder="Enter phone number"
                />

              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success"
              >

                <i className="bi bi-play-fill me-2"></i>

                Start Game

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

};

export default StartGameModal;
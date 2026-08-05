import { useState } from "react";

const Tables = ({ tables, setTables }) => {

  // Modal
  const [showModal, setShowModal] = useState(false);

  // Form Fields
  const [tableName, setTableName] = useState("");
  const [tableType, setTableType] = useState("");
  const [tableRate, setTableRate] = useState("");

  // Edit Mode
  const [editMode, setEditMode] = useState(false);
  const [editingTableId, setEditingTableId] = useState(null);

  // Open Edit Modal
  const handleEditClick = (table) => {

    setEditMode(true);

    setEditingTableId(table.id);

    setTableName(table.name);
    setTableType(table.type);
    setTableRate(table.rate);

    setShowModal(true);

  };

  // Add OR Update Table
  const handleAddTable = (e) => {

    e.preventDefault();

    if (
      !tableName.trim() ||
      !tableType.trim() ||
      !tableRate
    ) {
      alert("Please fill all fields.");
      return;
    }

    // UPDATE
    if (editMode) {

      const updatedTables = tables.map((table) => {

        if (table.id === editingTableId) {

          return {
            ...table,
            name: tableName,
            type: tableType,
            rate: Number(tableRate),
          };

        }

        return table;

      });

      setTables(updatedTables);

      setEditMode(false);
      setEditingTableId(null);

    }

    // ADD
    else {

      const newTable = {

        id: Date.now(),

        name: tableName,

        type: tableType,

        rate: Number(tableRate),

        status: "Available",

      };

      setTables([...tables, newTable]);

    }

    // Reset Form

    setTableName("");
    setTableType("");
    setTableRate("");

    setShowModal(false);

  };

  // Close Modal

  const handleCloseModal = () => {

    setShowModal(false);

    setEditMode(false);

    setEditingTableId(null);

    setTableName("");
    setTableType("");
    setTableRate("");

  };
  // Delete Table
const handleDeleteTable = (id) => {

  const table = tables.find((table) => table.id === id);

  // Don't delete a running table
  if (table.status === "Running") {
    alert("Cannot delete a running table.");
    return;
  }

  // Ask for confirmation
  const confirmDelete = window.confirm(
    `Delete ${table.name}?`
  );

  if (!confirmDelete) {
    return;
  }

  const updatedTables = tables.filter(
    (table) => table.id !== id
  );

  setTables(updatedTables);

};
    return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">
            Tables Management
          </h2>

          <p className="text-muted">
            Manage snooker tables.
          </p>
        </div>

        <button
          className="btn btn-success"
          onClick={() => setShowModal(true)}
        >
          + Add Table
        </button>

      </div>

      {/* Tables */}

      <div className="row">

        {tables.map((table) => (

          <div
            className="col-md-4 mb-3"
            key={table.id}
          >

            <div className="card shadow-sm border-0">

              <div className="card-body">

                <h4>
                  🎱 {table.name}
                </h4>

                <p>
                  <strong>Type:</strong> {table.type}
                </p>

                <p>
                  <strong>Rate:</strong> ₹{table.rate}/hour
                </p>

                <p>
                  <strong>Status:</strong>{" "}

                  {table.status === "Running" ? (
                    <span className="badge bg-danger">
                      Running
                    </span>
                  ) : (
                    <span className="badge bg-success">
                      Available
                    </span>
                  )}

                </p>

                <div className="d-flex gap-2 mt-3">

  <button
    className="btn btn-warning btn-sm w-50"
    onClick={() => handleEditClick(table)}
  >
    ✏ Edit
  </button>

  <button
    className="btn btn-danger btn-sm w-50"
    onClick={() => handleDeleteTable(table.id)}
  >
    🗑 Delete
  </button>

</div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Modal */}

      {showModal && (

        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        >

          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content">

              <form onSubmit={handleAddTable}>

                <div className="modal-header">

                  <h5>
                    {editMode
                      ? "Edit Table"
                      : "Add New Table"}
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  />

                </div>

                <div className="modal-body">

                  <div className="mb-3">

                    <label className="form-label">
                      Table Name
                    </label>

                    <input
                      className="form-control"
                      value={tableName}
                      onChange={(e) =>
                        setTableName(e.target.value)
                      }
                    />

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Table Type
                    </label>

                    <select
                      className="form-select"
                      value={tableType}
                      onChange={(e) =>
                        setTableType(e.target.value)
                      }
                    >

                      <option value="">
                        Select
                      </option>

                      <option>
                        French
                      </option>

                      <option>
                        English
                      </option>

                      <option>
                        Small
                      </option>

                    </select>

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Hourly Rate
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      value={tableRate}
                      onChange={(e) =>
                        setTableRate(e.target.value)
                      }
                    />

                  </div>

                </div>

                <div className="modal-footer">

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-success"
                  >
                    {editMode
                      ? "Update Table"
                      : "Save Table"}
                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Tables;
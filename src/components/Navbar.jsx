import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg premium-navbar shadow">

      <div className="container">

        {/* Logo */}

        <NavLink
          to="/dashboard"
          className="navbar-brand d-flex align-items-center fw-bold fs-3 text-white text-decoration-none"
        >
      <i className="bi bi-controller fs-2 me-2 text-warning"></i>

          CueMaster
        </NavLink>

        {/* Mobile Button */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#cueMasterNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar */}

        <div
          className="collapse navbar-collapse"
          id="cueMasterNavbar"
        >

          <ul className="navbar-nav mx-auto gap-2">

            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className="nav-link"
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/tables"
                className="nav-link"
              >
                Tables
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/history"
                className="nav-link"
              >
                Game History
              </NavLink>
            </li>
            <li className="nav-item">
  <NavLink
    to="/reports"
    className="nav-link"
  >
    Reports
  </NavLink>
</li>

            <li className="nav-item">
              <NavLink
                to="/customers"
                className="nav-link"
              >
                Customers
              </NavLink>
            </li>

          </ul>

          {/* Admin */}

          <div className="d-flex align-items-center">

            <div className="admin-avatar me-3">
              A
            </div>

            <div>

              <div className="fw-bold text-white">
                Admin
              </div>

              <small className="text-white-50">
                Club Manager
              </small>

            </div>

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;
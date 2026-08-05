const DashboardHeader = () => {

  return (

    <div className="dashboard-header shadow-sm mb-4">

      <div className="d-flex justify-content-between align-items-center flex-wrap">

        <div>

          <h2 className="fw-bold text-white mb-2">

            <i className="bi bi-speedometer2 me-2"></i>

            CueMaster Dashboard

          </h2>

          <p className="text-light mb-0">

            Manage your snooker club efficiently.

          </p>

        </div>

        <div className="text-end mt-3 mt-md-0">

          <span className="dashboard-date">

            {new Date().toLocaleDateString("en-IN", {

              weekday: "long",

              day: "numeric",

              month: "long",

              year: "numeric",

            })}

          </span>

        </div>

      </div>

    </div>

  );

};

export default DashboardHeader;
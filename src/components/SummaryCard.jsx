const SummaryCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="card summary-card shadow-sm h-100">

      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center">

          <div>

            <p className="summary-title mb-2">
              {title}
            </p>

            <h2 className="summary-value mb-1">
              {value}
            </h2>

            <small className="text-muted">
              {subtitle}
            </small>

          </div>

          <div className="summary-icon">
            {icon}
          </div>

        </div>

      </div>

    </div>
  );
};

export default SummaryCard;
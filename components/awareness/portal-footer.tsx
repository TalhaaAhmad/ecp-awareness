export function PortalFooter() {
  return (
    <footer className="site-footer">
      {/* Green wave accent */}
      <svg className="footer-wave" viewBox="0 0 1440 46" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 0 18 Q 432 63 892.8 23 T 1440 20 V 18 Z" fill="#CDEBD8" />
      </svg>

      <div className="footer-inner">
        <div className="footer-content">
          <h2 className="footer-heading">Your vote matters.</h2>
          <p className="footer-subtext">
            <span>Be informed. Be empowered.</span>{" "}<span>Make your vote count.</span>
          </p>
          <span className="footer-label">VOTER EDUCATION</span>
        </div>

        <div className="footer-right">
          <strong className="footer-pakistan">
            A STRONGER
            <br />
            PAKISTAN TOGETHER
          </strong>
        </div>
      </div>
    </footer>
  );
}

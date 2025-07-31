import { Link } from "react-router-dom";

export default function PlaceholderPage({ title }) {
  return (
    <div className="min-vh-100 bg-gradient-hero d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow-lg border-0">
              <div className="card-body text-center p-5">
                <div className="feature-icon mx-auto mb-4">
                  <i className="bi bi-tools fs-2"></i>
                </div>
                <h2 className="card-title fw-bold mb-3">{title} Page</h2>
                <p className="card-text text-muted mb-4">
                  This page is coming soon! We're working hard to bring you amazing content.
                </p>
                <p className="small text-muted mb-4">
                  Want to help us build this page? Continue the conversation to let us know what you'd like to see here.
                </p>
                <Link to="/" className="btn btn-outline-primary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

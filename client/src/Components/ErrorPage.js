import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="text-center mt-4">
      <h1>404 Page Not Found</h1>
      <Link to="/">
        <button className="btn btn-primary-outline">Back to Home page</button>
      </Link>{" "}
    </div>
  );
}

export default ErrorPage;

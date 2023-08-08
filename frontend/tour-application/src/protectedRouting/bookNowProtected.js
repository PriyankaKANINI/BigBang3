import { Navigate } from "react-router-dom";

function BookNowProtected({ token, children }) {
  token = localStorage.getItem("token");
  if (token != null) return children;
  return <Navigate to="/" />;
}

export default BookNowProtected;

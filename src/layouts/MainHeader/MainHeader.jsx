import { Link } from "react-router-dom";
function MainHeader() {
  return (
    <nav className="flex gap-5">
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default MainHeader;

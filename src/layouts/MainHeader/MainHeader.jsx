import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import { AuthContext } from "../../context/AuthContext/AuthContext";

function MainHeader() {
  const { user, logOutUser } = useContext(AuthContext);
  const nevigate = useNavigate();

  const logOutHandler = () => {
    logOutUser();
    toast.success("LogOut Successful");
    nevigate("/");
  };

  return (
    <nav className="flex gap-5">
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      {user && (
        <button className="cursor-pointer" onClick={logOutHandler}>
          Log Out
        </button>
      )}
      <LanguageSwitcher />
    </nav>
  );
}

export default MainHeader;

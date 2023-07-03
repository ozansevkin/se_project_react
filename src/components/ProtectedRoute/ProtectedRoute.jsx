import { Route, Redirect } from "react-router-dom";
import { checkToken } from "../../utils/auth";

function ProtectedRoute({ children, ...props }) {
  const token = localStorage.getItem("jwt");
  const isAuth = token ? checkToken(token).then(true).catch(false) : false;
  // isLoggedIn state is not usable to check auth in Route as app states do not persist between page reloads

  return <Route {...props}>{isAuth ? children : <Redirect to="/" />}</Route>;
}

export default ProtectedRoute;

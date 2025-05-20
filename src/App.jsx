import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import RegisterPage from "./pages/Registerpage/RegisterPage";
import { useEffect } from "react";
import { refresh } from "./redux/auth/authOperations";
import { selectIsRefreshing, selectLoading } from "./redux/auth/authSelectors";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage";
import LoginPage from "./pages/Loginpage/LoginPage";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MatchPage from './pages/Matchpage/MatchPage'
function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
const loading = useSelector(selectLoading)

  useEffect(() => {
    dispatch(refresh);
  });
  return (
    <>
      <Toaster />
      {
        isRefreshing ? (
          <p> {loading} </p>
        ):(
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/register" element={<RestrictedRoute redirectTo = "/match" element={<RegisterPage/>} />} />
            <Route path="/login" element={<RestrictedRoute redirectTo="/match" elemetn={<LoginPage/>} />} />
            <Route path="/match" element={<PrivateRoute redirectTo="/" element={<MatchPage/>} />} />
          </Routes>
        )
      }
    </>
  );
}

export default App;

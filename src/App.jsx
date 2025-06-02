import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import RegisterPage from "./pages/Registerpage/RegisterPage";
import { useEffect } from "react";
import { refresh } from "./redux/auth/authOperations";
import { selectIsRefreshing, selectIsLoggedIn } from "./redux/auth/authSelectors";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage/HomePage";
import LoginPage from "./pages/Loginpage/LoginPage";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import MatchPage from "./pages/Matchpage/MatchPage";
import ScoreBoard from './components/ScoreBoard';

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(refresh());
  },[dispatch]);

  return (
    <>
      <Toaster />
      {isRefreshing ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/match" element={<RegisterPage />} />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/match" element={<LoginPage />} />
            }
          />
          <Route
            path="/match"
            element={<PrivateRoute redirectTo="/" element={<MatchPage />} />}
          />
          <Route path="*" element={<HomePage />} />
        </Routes>
      )}
      {isLoggedIn && <ScoreBoard />}
    </>
  );
}

export default App;

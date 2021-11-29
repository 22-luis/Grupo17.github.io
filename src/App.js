import logo from "./logo.svg";
import "./App.css";
import { Login } from "./Components/Views/Login/Login";
import { Register } from "./Components/Views/Login/Register";
import { DashboardAdmin } from "./Components/Views/Dashboard/DashboardAdmin";
import { DashboardUser } from "./Components/Views/Dashboard/DashboardUser";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PrivateRoute from "./Components/Router/PrivateRoute";
import { AddProduct } from "./Components/Views/Product/AddProduct";
import { Product } from "./Components/Views/Product/Product";
import { Favorites } from "./Components/Views/Favorites/Favorites";


function App({ token, rol }) {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route
          exact
          path="/DashAdmin"
          element={
            <PrivateRoute role="admin">
              <DashboardAdmin />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/DashAdmin/addProduct"
          element={
            <PrivateRoute role="admin">
              <AddProduct></AddProduct>
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/DashAdmin/Product"
          element={
            <PrivateRoute role="admin">
              <Product />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/DashUser"
          element={
            <PrivateRoute role="user">
              <DashboardUser />
            </PrivateRoute>
          }
        ></Route>
                <Route
          exact
          path="/DashAdmin/Favoritos"
          element={
            <PrivateRoute role="admin">
              <Favorites />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

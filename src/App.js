import "./App.css";
import { Login } from "./Components/Views/Login/Login";
import { DashboardAdmin } from "./Components/Views/Dashboard/DashboardAdmin";
import { DashboardUser } from "./Components/Views/Dashboard/DashboardUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/Router/PrivateRoute";
import { AddProduct } from "./Components/Views/Product/AddProduct";
import { Product } from "./Components/Views/Product/Product";


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
          path="/DashUser/Favorite"
          element={
            <PrivateRoute role="user">
              
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

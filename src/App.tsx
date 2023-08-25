import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Edit from "./components/Edit/Edit";
import Home from "./components/Home/Home";
import AddCar from "./components/AddCar/AddCar";
import Car from "./components/Car/Car";
import Login from "./components/LogIn/Login";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cars/:id" element={<Car />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/edit" element={<Edit />} />
          <Route path="/add" element={<AddCar />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

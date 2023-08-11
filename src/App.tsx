import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { LoginContext } from "./contexts/LoginContext";
import LogIn from "./components/LogIn/LogIn";
import Edit from "./components/Edit/Edit";
import Home from "./components/Home/Home";
import AddCar from "./components/AddCar/AddCar";
import Car from "./components/Car/Car";

function App() {
  const [loggedUser, setLoggedUser] = useState(false);

  return (
    <>
      <LoginContext.Provider value={{ loggedUser, setLoggedUser }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/add" element={<AddCar />} />
          <Route path="/cars/:id" element={<Car />} />
        </Routes>
      </LoginContext.Provider>
    </>
  );
}

export default App;

//FOR JWT check
// import React from "react";
// import { useState, useEffect } from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

// import * as AuthService from "./JWT/services/auth.services";
// import IUser from "./JWT/types/user.type";

// import Login from "./JWT/components/Login";
// import Register from "./JWT/components/Register";
// import Home from "./JWT/components/Home";
// import BoardUser from "./JWT/components/BoardUser";
// import BoardModerator from "./JWT/components/BoardModerator";
// import BoardAdmin from "./JWT/components/BoardAdmin";
// import Profile from "./JWT/components/Profile";

// import EventBus from "./JWT/common/EventBus";

// const App: React.FC = () => {
//   const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
//   const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
//   const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

//   useEffect(() => {
//     const user = AuthService.getCurrentUser();

//     if (user) {
//       setCurrentUser(user);
//       setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
//       setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
//     }

//     EventBus.on("logout", logOut);

//     return () => {
//       EventBus.remove("logout", logOut);
//     };
//   }, []);

//   const logOut = () => {
//     AuthService.logout();
//     setShowModeratorBoard(false);
//     setShowAdminBoard(false);
//     setCurrentUser(undefined);
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand navbar-dark bg-dark">
//         <Link to={"/"} className="navbar-brand">
//           bezKoder
//         </Link>
//         <div className="navbar-nav mr-auto">
//           <li className="nav-item">
//             <Link to={"/home"} className="nav-link">
//               Home
//             </Link>
//           </li>

//           {showModeratorBoard && (
//             <li className="nav-item">
//               <Link to={"/mod"} className="nav-link">
//                 Moderator Board
//               </Link>
//             </li>
//           )}

//           {showAdminBoard && (
//             <li className="nav-item">
//               <Link to={"/admin"} className="nav-link">
//                 Admin Board
//               </Link>
//             </li>
//           )}

//           {currentUser && (
//             <li className="nav-item">
//               <Link to={"/user"} className="nav-link">
//                 User
//               </Link>
//             </li>
//           )}
//         </div>

//         {currentUser ? (
//           <div className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <Link to={"/profile"} className="nav-link">
//                 {currentUser.username}
//               </Link>
//             </li>
//             <li className="nav-item">
//               <a href="/login" className="nav-link" onClick={logOut}>
//                 LogOut
//               </a>
//             </li>
//           </div>
//         ) : (
//           <div className="navbar-nav ml-auto">
//             <li className="nav-item">
//               <Link to={"/login"} className="nav-link">
//                 Login
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link to={"/register"} className="nav-link">
//                 Sign Up
//               </Link>
//             </li>
//           </div>
//         )}
//       </nav>

//       <div className="container mt-3">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/user" element={<BoardUser />} />
//           <Route path="/mod" element={<BoardModerator />} />
//           <Route path="/admin" element={<BoardAdmin />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;

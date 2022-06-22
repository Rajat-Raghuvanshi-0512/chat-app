import React from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom"
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
function App() {
  useEffect(() => {
    localStorage.getItem("mode") === "dark" ?
      document.body.classList = "dark" :
      document.body.classList = ""
  }, [])
  return (
    <>
      <Routes>

        {/* Public Routes  */}
        <Route element={<PublicRoutes />} >
          <Route path="/signin" element={<SignIn />} />
        </Route>

        {/* Protected Routes  */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/room/:roomId" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

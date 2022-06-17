import React from "react";
import { Route, Routes } from "react-router-dom"
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
function App() {
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

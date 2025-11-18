import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import DashBoard from "../pages/DashBoard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Account from "../pages/Account";
import Error from "../pages/Error";
import Entry from "../pages/Entry";
import { useEffect, useState } from "react";
import { type userDetails } from "../utils/Types";

function RoutesHandle() {
  const [user, setUser] = useState<userDetails | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <App /> : <Entry />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/login" element={user ? <Error /> : <Login />} />
        <Route path="/signup" element={user ? <Error /> : <SignUp />} />
        <Route path="/account" element={<Account />} />

        {/* fallback */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesHandle;

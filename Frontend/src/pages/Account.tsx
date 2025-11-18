import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import { FaAngleLeft } from "react-icons/fa";

export default function Account() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  }

  if (!user) return null;

  return (
    <div className="min-h-screen w-full bg-[#0f1923] text-white flex flex-col relative">
      {/* Header */}
      <header className="w-full px-2 py-2 border-[#1a2633] flex justify-between items-center sticky top-0 bg-[#0f1923]">
        <FaAngleLeft
          className="w-4 h-4 absolute left-2 top-2 text-white cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </header>

      {/* Mobile Tabs */}
      <div className="w-full flex border-b border-[#1a2633] text-sm">
        <MobileTab id="profile" label="Profile" active={tab} onClick={setTab} />
        <MobileTab
          id="security"
          label="Security"
          active={tab}
          onClick={setTab}
        />
        <MobileTab
          id="activity"
          label="Activity"
          active={tab}
          onClick={setTab}
        />
      </div>

      {/* Content */}
      <main className="flex-grow p-4 pb-24 overflow-y-auto">
        {tab === "profile" && <ProfileTab user={user} logout={logout} />}
        {tab === "security" && <SecurityTab />}
        {tab === "activity" && <ActivityTab user={user} />}
      </main>

      {/* Bottom Nav */}
      <div className="flex flex-col items-center w-full">
        <NavBar />
      </div>
    </div>
  );
}

/* ---------------- TAB BUTTON ---------------- */
function MobileTab({ id, label, active, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`flex-1 py-3 text-center transition
      ${
        active === id
          ? "text-white border-b-2 border-white"
          : "text-gray-400 hover:text-gray-200"
      }`}
    >
      {label}
    </button>
  );
}

/* ---------------- PROFILE TAB ---------------- */
function ProfileTab({ user, logout }) {
  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-[#1a2633]">
          <img
            src={user.profile_photo || "/default-avatar.png"}
            className="w-full h-full object-cover"
            alt="profile avatar"
          />
        </div>
        <div className="mt-2 text-xs text-gray-400">Tap to change photo</div>
      </div>

      {/* Profile Info */}
      <MobileSection title="Full Name" value={user.full_name} />
      <MobileSection title="Username" value={user.user_name} />
      <MobileSection title="Email" value={user.email} />
      <MobileSection title="Address" value={user.address || "Not set"} />
      <MobileSection title="Country" value={user.country || "Not set"} />

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-40 text-center py-2 cursor-pointer rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-500 transition mx-auto block"
      >
        Logout
      </button>
    </div>
  );
}

/* ---------------- SECURITY TAB ---------------- */
function SecurityTab() {
  return (
    <div className="space-y-6">
      <MobileSection title="Two-Factor Auth" value="Disabled" />
      <MobileSection title="Password Updated" value="3 months ago" />

      <button className="w-full py-3 rounded-md bg-[#1a2633] text-sm hover:bg-[#223040] transition">
        Change Password
      </button>
    </div>
  );
}

/* ---------------- ACTIVITY TAB ---------------- */
function ActivityTab({ user }) {
  return (
    <div className="space-y-6">
      <MobileSection title="Last Login" value={user.last_login || "Unknown"} />
      <MobileSection title="Active Sessions" value="1 Device" />
      <MobileSection title="Joined" value={user.created_at || "Unknown"} />
    </div>
  );
}

/* ---------------- INFORMATION SECTION ---------------- */
function MobileSection({ title, value }) {
  return (
    <div className="border-b border-[#1a2633] pb-3">
      <p className="text-xs text-gray-400 mb-1">{title}</p>
      <p className="text-base">{value}</p>
    </div>
  );
}

import { useState } from "react";
import Login from "./pages/Login";
import Booking from "./pages/Booking";
import MyAppointments from "./pages/MyAppointments";
import Admin from "./pages/Admin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [page, setPage] = useState("booking");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    const shouldLogout = window.confirm("Are you sure you want to logout?");
    if (shouldLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setPage("booking");
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const navItems = [
    { key: "booking", label: "Booking" },
    { key: "appointments", label: "My Appointments" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col bg-slate-950 px-6 py-8 text-white lg:flex">
          <div>
            <div className="text-2xl font-bold tracking-tight">📅 Bookify</div>
            <p className="mt-3 text-sm text-slate-400">
              Appointment management for modern teams.
            </p>
          </div>

          <nav className="mt-10 flex flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setPage(item.key)}
                className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  page === item.key
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}

            {user?.role === "admin" && (
              <button
                onClick={() => setPage("admin")}
                className={`rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  page === "admin"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                Admin
              </button>
            )}
          </nav>

          <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm font-semibold">Production Demo</p>
            <p className="mt-2 text-xs text-slate-400">
              Full-stack booking app with React, Node.js, Prisma, and PostgreSQL.
            </p>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="text-sm font-medium text-blue-600">
                    Welcome to Bookify
                  </div>

                  <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                    {page === "booking" && "Available Slots"}
                    {page === "appointments" && "My Appointments"}
                    {page === "admin" && "Admin Panel"}
                  </h1>

                  <p className="mt-2 text-sm text-slate-500">
                    Welcome back,{" "}
                    <span className="font-semibold text-slate-700">
                      {user?.email}
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:hidden">
                  {navItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setPage(item.key)}
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                        page === item.key
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}

                  {user?.role === "admin" && (
                    <button
                      onClick={() => setPage("admin")}
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                        page === "admin"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      }`}
                    >
                      Admin
                    </button>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">System Status</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">Live</p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Role Access</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  JWT + RBAC
                </p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <p className="text-sm text-slate-500">Stack</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  React + Node
                </p>
              </div>
            </div>

            {page === "booking" && <Booking />}
            {page === "appointments" && <MyAppointments />}
            {page === "admin" && user?.role === "admin" && <Admin />}

            <div className="mt-10 text-center text-sm text-slate-500">
              © {new Date().getFullYear()} Bookify. Built with React & Node.js.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
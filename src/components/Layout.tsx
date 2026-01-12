import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container">
      <div className="nav">
        <div className="brand">
          <div className="brand-title">Cashlock</div>
          <div className="brand-subtitle">Product Marketing Portfolio</div>
        </div>

        <div className="row">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/work" className={({ isActive }) => (isActive ? "active" : "")}>
            Work
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
            Contact
          </NavLink>
        </div>
      </div>

      {children}

      <div className="hr" />
      <div className="p">
        © {new Date().getFullYear()} Cashlock. Built with Vite + React, hosted on GitHub Pages.
      </div>
    </div>
  );
}

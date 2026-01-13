import type { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container">
      <div className="nav">
<div className="brand">
  <div className="brand-title">Christian Ashlock</div>
    <div className="brand-accent" />
  <div className="brand-subtitle">
    Product marketing leader | B2B, SaaS, ads & tech | Builds teams & brands
  </div>
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

     <div className="footer-accent" />
<div className="p">
  © {new Date().getFullYear()} Christian Ashlock.
</div>
    </div>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Adjust import path as needed

function Navbar() {
  const { isAuth, authUser } = useAuth();

  const getActiveClassName = ({ isActive }) => (isActive ? "active" : "");

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink className={getActiveClassName} to="/" end>
          Blogging App
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className={getActiveClassName} to="/" end>
              Home
            </NavLink>
          </li>

          {isAuth && (
            <>
              <li className="nav-item">
                <NavLink className={getActiveClassName} to="/editor">
                  New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getActiveClassName} to="/settings">
                  Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getActiveClassName} to={`/@${authUser?.username}`}>
                  Hi {authUser?.username}
                </NavLink>
              </li>
            </>
          )}

          {!isAuth && (
            <>
              <li className="nav-item">
                <NavLink className={getActiveClassName} to="/register">
                  Sign up
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={getActiveClassName} to="/login">
                  Sign in
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import { logoutUser } from "../services/auth";

export const Header = ({
  isAdmin,
  setIsAdmin,
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const handleUser = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">
          <a href="/">Restaurant</a>
        </h1>
        <nav>
          <ul className="header-nav">
            <li>
              <button onClick={handleUser} className="header-button">
                {isAdmin ? "Admin" : "User"}
              </button>
            </li>
            {isAuthenticated && (
              <li>
                <button
                  onClick={async () => {
                    await logoutUser();
                    setIsAuthenticated(false);
                  }}
                  className="header-button"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="NavBar">
      <Link className="NavBar__Links" to="/reviews">
        All
      </Link>
      <Link className="NavBar__Links" to="/reviews/categories/strategy">
        Strategy
      </Link>
      <Link className="NavBar__Links" to="/reviews/categories/hidden-roles">
        Hidden Roles
      </Link>
      <Link className="NavBar__Links" to="/reviews/categories/dexterity">
        Dexterity
      </Link>
      <Link className="NavBar__Links" to="/reviews/categories/push-your-luck">
        Push Your Luck
      </Link>
      <Link className="NavBar__Links" to="/reviews/categories/roll-and-write">
        Roll-and-Write
      </Link>
      <Link className="NavBar__Links" to="/reviews/categories/deck-building">
        Deck Building
      </Link>
      <Link className="NavBar__Links" to="/reviews/categories/engine-building">
        Engine Building
      </Link>
    </nav>
  );
};

export default NavBar;

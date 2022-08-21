import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    return (
      <div>
        <img
          alt="logo"
          className="logo"
          src="https://www.freecodecamp.org/news/content/images/2022/06/crud.png"
        />
        <ul className="nav-ul">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/add">Add Task</Link>
          </li>
          <li>
            <Link to="/update">Update Task</Link>
          </li>
        </ul>
      </div>
    );
};

export default Nav;
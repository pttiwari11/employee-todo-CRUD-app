import React, { useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import moment from "moment";

const PORT = process.env.PORT || 8000

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    let result = await fetch(`http://localhost:${PORT}/tasks`);
    result = await result.json();
    console.log(result);
    setTasks(result);
  };

  const deleteTask = async (id) => {
    console.warn(id);
    let result = await fetch(`http://localhost:${PORT}/task/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getTasks();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:${PORT}/search/${key}`);
      result = await result.json();
      if (result) {
        setTasks(result);
      }
    } else {
      getTasks();
    }
  };

    return (
      <div className="dashboard">
        <input
          type=""
          className="search-task-box"
          placeholder="Search Tasks"
          onChange={searchHandle}
        />
        <ul>
          <li style={{ fontWeight: "bold" }}>S. No</li>
          <li className="data">Title</li>
          <li className="data">Description</li>
          <li className="data">Start Date & Time</li>
          <li className="data">End Date & Time</li>
          <li className="data">Priority</li>
          <li className="data">Status</li>
          <li style={{ fontWeight: "bold" }}>Operation</li>
        </ul>
        {tasks.length > 0 ? (
          tasks.map((item, index) => (
            <ul key={item._id}>
              <li>{index + 1}</li>
              <li>{item.title}</li>
              <li>{item.description}</li>
              <li>{item.starttime}</li>
              <li>{item.endtime}</li>
              <li>{item.priority}</li>
              <li>{item.status}</li>
              <li>
                <button
                  onClick={() => deleteTask(item._id)}
                  style={{ fontWeight: "bold" }}
                >
                  Delete
                </button>
                <button style={{ fontWeight: "bold" }}>
                  <Link
                    to={"/update/" + item._id}
                    style={{ textDecoration: "none" }}
                  >
                    Update{" "}
                  </Link>
                </button>
              </li>
            </ul>
          ))
        ) : (
          <h1>No Result Found</h1>
        )}
      </div>
    );
};

export default Dashboard;
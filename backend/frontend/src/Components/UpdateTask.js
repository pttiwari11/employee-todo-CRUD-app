import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PORT = process.env.PORT || 8000;

const UpdateTask = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [starttime, setStartTime] = React.useState("");
    const [endtime, setEndTime] = React.useState("");
    const [priority, setPriority] = React.useState("");
    const [status, setStatus] = React.useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      getTaskDetails();
    }, []);

    const getTaskDetails = async () => {
      console.warn(params);
      let result = await fetch(`http://localhost:${PORT}/task/${params.id}`);
      result = await result.json();
      setTitle(result.title);
      setDescription(result.description);
      setStartTime(result.starttime);
      setEndTime(result.endtime);
      setPriority(result.priority);
      setStatus(result.Status);
    };

    const updateTask = async () => {
      console.warn(title, description, starttime, endtime, priority, status);
      let result = await fetch(`http://localhost:${PORT}/task/${params.id}`, {
        method: "Put",
        body: JSON.stringify({
          title,
          description,
          starttime,
          endtime,
          priority,
          status,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      });
      result = await result.json();
      if (result) {
        navigate("/");
      }
    };

    return (
      <div className="token">
        <h1>Update Task</h1>
        <input
          type="text"
          placeholder="Enter title"
          className="inputBox"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Enter description"
          className="inputBox"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Enter start date & time"
          className="inputBox"
          value={starttime}
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Enter end date & time"
          className="inputBox"
          value={endtime}
          onChange={(e) => {
            setEndTime(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Enter priority"
          className="inputBox"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Enter status"
          className="inputBox"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        />

        <button onClick={updateTask} className="appButton">
          Update Task
        </button>
      </div>
    );
};

export default UpdateTask;

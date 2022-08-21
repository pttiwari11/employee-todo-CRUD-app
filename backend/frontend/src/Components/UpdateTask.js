import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import moment from  "moment";

const PORT = process.env.PORT || 8000;

/* UpdateTask function for updating the task details */
const UpdateTask = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [starttime, setStartTime] = React.useState(new Date());
    const [endtime, setEndTime] = React.useState(new Date());
    const [priority, setPriority] = React.useState("");
    const [status, setStatus] = React.useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      getTaskDetails();
    }, []);

    {/* this function is fetching task details from database using id provided in the url */}
    const getTaskDetails = async () => {
      console.warn(params);
      let result = await fetch(`http://localhost:${PORT}/task/${params.id}`);
      result = await result.json();
      setTitle(result.title);
      setDescription(result.description);
      setPriority(result.priority);
      setStatus(result.status);
    };

    {/* this function is updating the details of task on button click */}
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

    const handleStartTimeChange = (e) => {
      const startDate = (e);
      setStartTime(startDate);
    };

    const handleEndTimeChange = (e) => {
      const endDate = (e);
      setEndTime(endDate);
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

        <DatePicker
          selected={starttime}
          onChange={(e) => handleStartTimeChange(e)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={20}
          timeCaption="time"
          dateFormat="dd/MM/yyyy, h:mm a"
          className="inputBox"
        />

        <DatePicker
          selected={endtime}
          onChange={(e) => handleEndTimeChange(e)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={20}
          timeCaption="time"
          dateFormat="dd/MM/yyyy, h:mm a"
          className="inputBox"
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

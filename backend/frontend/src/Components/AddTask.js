import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import moment from "moment";

const PORT = process.env.PORT || 8000;

/*
function to create new task
*/

const AddTask = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [starttime, setStartTime] = React.useState(new Date());
  const [endtime, setEndTime] = React.useState(new Date());
  const [priority, setPriority] = React.useState("");
  const [status, setStatus] = React.useState("");
  
  const [error, setError] = React.useState(false);

  const addTask = async () => {
    if (                                         
      !title ||
      !description ||
      !starttime ||
      !endtime ||
      !priority ||
      !status
    ) {
      setError(true);
      return false;
    }

    {/*posting your input data to the database */}
    
    let result = await fetch(`http://localhost:${PORT}/add-task`, {
      method: "post",
      body: JSON.stringify({ title, description, starttime, endtime, priority, status }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
  };

  const handleStartTimeChange = (e) => {
    const startDate = e;
    setStartTime(startDate);
  }

  const handleEndTimeChange = (e) => {
    const endDate = e;
    setEndTime(endDate);
  };

  return (
    <div className="token">
      <h1>Add Task</h1>
      <input
        type="text"
        placeholder="Enter title"
        className="inputBox"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      {error && !title && (
        <span className="invalid-input">Enter valid title</span>
      )}

      <input
        type="text"
        placeholder="Enter description"
        className="inputBox"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      {error && !description && (
        <span className="invalid-input">Enter valid description</span>
      )}

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
      {error && !starttime && (
        <span className="invalid-input">Enter valid date & time</span>
      )}

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
      {error && !endtime && (
        <span className="invalid-input">Enter valid date & time</span>
      )}

      <input
        type="text"
        placeholder="Enter priority"
        className="inputBox"
        value={priority}
        onChange={(e) => {
          setPriority(e.target.value);
        }}
      />
      {error && !priority && (
        <span className="invalid-input">Enter valid priority</span>
      )}

      <input
        type="text"
        placeholder="Enter status"
        className="inputBox"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
      />
      {error && !status && (
        <span className="invalid-input">Enter valid status</span>
      )}

      <button onClick={addTask} className="appButton">
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
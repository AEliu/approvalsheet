import "./App.css";
import React, { useState } from "react";

import Hello from "./component/Hello";
import Clock from "./component/Clock";

const Approvalform = ({ title, towho, onInputChange, approvals, setApprovals }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('%cApp.js line:10 title', 'color: #007acc;', title);

    const approvalObject = {
      id: timestamp(),
      title: title,
      towho: towho,
    }
    setApprovals(approvals.concat(approvalObject))
  };

  const timestamp = () => Date.now();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("%cApp.js line:20 name, value", "color: #007acc;", name, value);
    onInputChange((values) => ({ ...values, [name]: value }));
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      {/* <p>content:</p> */}
      <input
        type="text"
        name="title"
        id=""
        value={title}
        onChange={handleChange}
        placeholder="title..."
      />
      <input
        type="text"
        name="towho"
        id=""
        value={towho}
        onChange={handleChange}
      />
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
};

const App = () => {
  const [approvals, setApprovals] = useState([
    JSON.parse(localStorage.getItem("approval")) || ''
  ]);

  const [newApproval, setNewApproval] = useState({});

  return (
    <>
      <Hello name="cc" />
      <Clock />

      <Approvalform
        title={newApproval.title}
        towho={newApproval.towho}
        onInputChange={setNewApproval}
        approvals={approvals}
        setApprovals={setApprovals}
      />
    </>
  );
};

export default App;

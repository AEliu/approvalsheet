import "./App.css";
import React, { useState, useEffect } from "react";

const Approvalform = ({
  heading,
  receiver,
  setNewApproval,
  approvals,
  setApprovals,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("%cApp.js line:10 title", "color: #007acc;", heading);

    const approvalObject = {
      id: timestamp(),
      heading: heading,
      receiver: receiver,
    };
    const newApprovals = approvals.concat(approvalObject);
    localStorage.setItem("approval", JSON.stringify(newApprovals));
    setApprovals(newApprovals);
    setNewApproval({
      id: '',
      heading: '',
      receiver: '',
    });
  };

  const timestamp = () => Date.now();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("%cApp.js line:20 name, value", "color: #007acc;", name, value);
    setNewApproval((values) => ({ ...values, [name]: value }));
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <p>填写发文信息:</p>
      <input
        type="text"
        name="heading"
        id=""
        value={heading}
        onChange={handleChange}
        placeholder="标题..."
      />
      <input
        type="text"
        name="receiver"
        id=""
        value={receiver}
        onChange={handleChange}
        placeholder="主送机关……"
      />
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
};

const App = () => {
  const [approvals, setApprovals] = useState([]);
  const [newApproval, setNewApproval] = useState({
    id: '',
    heading: '',
    receiver: '',
  });

  useEffect(() => {
    const allApprovals = JSON.parse(localStorage.getItem("approval"));
    if (allApprovals) setApprovals(allApprovals);
  }, []);

  return (
    <>
      <Approvalform
        heading={newApproval.heading}
        receiver={newApproval.receiver}
        setNewApproval={setNewApproval}
        approvals={approvals}
        setApprovals={setApprovals}
      />
    </>
  );
};

export default App;

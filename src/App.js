import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Approvalform = ({
  heading,
  receiver,
  setNewApproval,
  approvals,
  setApprovals,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const approvalObject = {
      id: timestamp(),
      heading: heading,
      receiver: receiver,
    };
    const newApprovals = approvals.concat(approvalObject);
    localStorage.setItem("approval", JSON.stringify(newApprovals));
    setApprovals(newApprovals);
    setNewApproval({
      id: "",
      heading: "",
      receiver: "",
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

const Approval = ({ approval }) => {
  let t = new Date(approval.id);
  let date = t.toLocaleDateString();
  return (
    <li>
      {date}-{approval.heading}
    </li>
  );
};

const Sheets = ({ sheets }) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {sheets.map((sheet) => (
        <li key={sheet.id}>
          <Link to={`/sheets/${sheet.id}`}>{sheet.heading}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const App = () => {
  const [approvals, setApprovals] = useState([]);
  const [newApproval, setNewApproval] = useState({
    id: "",
    heading: "",
    receiver: "",
  });

  useEffect(() => {
    const allApprovals = JSON.parse(localStorage.getItem("approval"));
    if (allApprovals) setApprovals(allApprovals);
  }, []);

  const padding = {
    padding: 5,
  };

  return (
    <>
      <Router>
        <Link to="/sheets" style={padding}>
          HISTORY
        </Link>
        <Link to="/" style={padding}>
          HOME
        </Link>
        <Routes>
          <Route path="/sheets" element={<Sheets sheets={approvals} />} />
          <Route
            path="/"
            element={
              <Approvalform
                heading={newApproval.heading}
                receiver={newApproval.receiver}
                setNewApproval={setNewApproval}
                approvals={approvals}
                setApprovals={setApprovals}
              />
            }
          />
        </Routes>
      </Router>

      <br />

      {/* <ul>
        {approvals
          .slice(-10)
          .reverse()
          .map((approval) => (
            <Approval key={approval.id.toString()} approval={approval} />
          ))}
      </ul> */}
    </>
  );
};

export default App;

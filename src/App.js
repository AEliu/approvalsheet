import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

const Approvalform = ({
  heading,
  receiver,
  setNewApproval,
  approvals,
  setApprovals,
}) => {
  const navigate = useNavigate();

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
    navigate(`/approvalsheet/sheets/${approvalObject.id}`)
  };

  const timestamp = () => Date.now();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("%cApp.js line:20 name, value", "color: #007acc;", name, value);
    setNewApproval((values) => ({ ...values, [name]: value }));
  };

  const padding = {
    padding: 5,
  };

  return (
    <>
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
      
      <Link to="/approvalsheet/sheets" style={padding}>
        发文历史
      </Link>

    </>
  );
};

const Approval = ({ approvals }) => {
  let id = useParams().id;
  const approval = approvals.find((n) => n.id === Number(id));
  let t = new Date(approval.id);
  let date = t.toLocaleDateString();
  return (
    <li>
      {date}-{approval.heading}
    </li>
  );
};

const Sheets = ({ sheets }) => {
  const padding = {
    padding: 5,
  };
  return (
  <div>
    <h2>Notes</h2>
    <ul>
      {sheets.map((sheet) => (
        <li key={sheet.id}>
          <Link to={`/approvalsheet/sheets/${sheet.id}`}>{sheet.heading}</Link>
        </li>
      ))}
    </ul>
    <Link to="/approvalsheet/" style={padding}>
        HOME
      </Link>
  </div>
)};

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

  

  return (
    <>
      <Router>
        {/* <Link to="/approvalsheet/sheets" style={padding}>
          HISTORY
        </Link> */}
        {/* <Link to="/approvalsheet/" style={padding}>
          HOME
        </Link> */}
        <Routes>
          <Route
            path="/approvalsheet/sheets"
            element={<Sheets sheets={approvals} />}
          />
          <Route
            path="/approvalsheet/"
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
          <Route
            path="/approvalsheet/sheets/:id"
            element={<Approval approvals={approvals} />}
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

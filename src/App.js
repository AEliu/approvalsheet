import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  redirect,
  useMatch,
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
    navigate(`/approvalsheet/sheets/${approvalObject.id}`);
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

const Approval = ({ sheet }) => {
  const t = new Date(sheet.id);
  const date = t.toLocaleDateString();
  return (
    <li>
      {date}-{sheet.heading}
    </li>
  );
};

const Sheets = ({ sheets }) => {
  const padding = {
    padding: 5,
  };
  return (
    <div>
      <h2>全部发文单</h2>
      <ul>
        {sheets.map((sheet) => (
          <li key={sheet.id}>
            <Link to={`/approvalsheet/sheets/${sheet.id}`}>
              {sheet.heading}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/approvalsheet/" style={padding}>
        HOME
      </Link>
    </div>
  );
};

const PageNotFound = () => {
  return (
    <>
      <h2>404 Page not found</h2>
    </>
  );
};

const App = () => {
  const [approvals, setApprovals] = useState(JSON.parse(localStorage.getItem("approval")) || []);
  const [newApproval, setNewApproval] = useState({
    id: "",
    heading: "",
    receiver: "",
  });
  console.log('%cApp.js line:136 approvals', 'color: #007acc;', approvals);

  useEffect(() => {
    console.log('%cApp.js line:139 approvals', 'color: #007acc;', approvals);
    const allApprovals = JSON.parse(localStorage.getItem("approval"));
    console.log('%cApp.js line:140 allApprovals', 'color: #007acc;', allApprovals);
    if (allApprovals) setApprovals(allApprovals);
  }, []);

  console.log("%cApp.js line:144 approvals", "color: #007acc;", approvals);
  const match = useMatch("/approvalsheet/sheets/:id");
  const sheet = match
    ? approvals.find((n) => n.id === Number(match.params.id))
    : null;

  console.log("%cApp.js line:150 sheet", "color: #007acc;", sheet);

  return (
    <>
      <Routes>
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
          path="/approvalsheet/sheets"
          element={<Sheets sheets={approvals} />}
        />

        <Route
          path="/approvalsheet/sheets/:id"
          element={<Approval sheet={sheet} />}
        />

        <Route path="/approvalsheet/404" element={<PageNotFound />} />

        <Route
          path="*"
          element={<Navigate to="/approvalsheet/404" replace />}
        />
      </Routes>
    </>
  );
};

export default App;

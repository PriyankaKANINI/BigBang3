import React, { useState, useEffect } from "react";
import "./status.css";
import AdminHome from "./adminHome";

const Status = () => {
  const [agents, setAgents] = useState([]);
  const [displayAgents, setDisplayAgents] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all"); // "all", "approved", "notApproved"

  useEffect(() => {
    fetch("http://localhost:5170/api/User/GetAllAgents/allAgents")
      .then((response) => response.json())
      .then((data) => {
        setAgents(data);
        setDisplayAgents(data);
      })
      .catch((error) => {
        console.error("Error fetching travel agents:", error);
      });
  }, []);

  const handleFilter = (status) => {
    if (status === "all") {
      setDisplayAgents(agents);
    } else {
      const filteredAgents = agents.filter(
        (agent) => agent.isVerified === status
      );
      setDisplayAgents(filteredAgents);
    }
    setFilterStatus(status);
  };

  return (
    <div className="ApproveAgentsWhole">
      <AdminHome />
      <div className="approve-agents-contents">
        <div className="approve-agents-container">
          <h2 className="approveTravelAgentsH2">
            Approved and Disapproved Travel Agents
          </h2>
          <div className="filter-buttons">
            <button
              className={filterStatus === "all" ? "active" : ""}
              onClick={() => handleFilter("all")}
            >
              All
            </button>
            <button
              className={filterStatus === "approved" ? "active" : ""}
              onClick={() => handleFilter("Approved")}
            >
              Approved
            </button>
            <button
              className={filterStatus === "notApproved" ? "active" : ""}
              onClick={() => handleFilter("Not Approved")}
            >
              Not Approved
            </button>
          </div>
        </div>
        <div className="agents-listApproval">
          <table className="agents-table">
            <thead>
              <tr>
                <th>Agent Name</th>
                <th>Company Name</th>
                <th>Company Email</th>
                <th>Company Address</th>
                <th>Company Reg No</th>
                <th>Phone No</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayAgents.map((agent) => (
                <tr key={agent.agentID}>
                  <td>{agent.agentName}</td>
                  <td>{agent.companyName}</td>
                  <td>{agent.email}</td>
                  <td>{agent.address}</td>
                  <td>{agent.companyRegistrationNumber}</td>
                  <td>{agent.phoneNumber}</td>
                  <td>{agent.isVerified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Status;

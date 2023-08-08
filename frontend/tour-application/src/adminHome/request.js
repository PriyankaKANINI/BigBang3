import React, { useState, useEffect } from "react";
import "./request.css";
import AdminHome from "./adminHome";

const Request = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5170/api/User/GetAllAgents/allAgents")
      .then((response) => response.json())
      .then((data) => {
        const pendingAgents = data.filter(
          (agent) => agent.isVerified === "Pending"
        );
        setAgents(pendingAgents);
      })
      .catch((error) => {
        console.error("Error fetching travel agents:", error);
      });
  }, [agents]);
  const handleApprove = (agentID) => {
    fetch(`http://localhost:5170/api/User/ApproveAgent/approve`, {
      method: "PUT", // Assuming you are using PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agentID }), // Include agentID in the request body
    })
      .then((response) => response.json())
      .then(() => {
        // Update the status of the approved agent
        const updatedAgents = agents.map((agent) =>
          agent.agentID === agentID
            ? { ...agent, isVerified: "Approved" }
            : agent
        );
        setAgents(updatedAgents);
      })
      .catch((error) => {
        console.error("Error approving agent:", error);
      });
  };

  const handleDisapprove = (agentID) => {
    fetch(`http://localhost:5170/api/User/DisapproveAgent/disapprove`, {
      method: "PUT", // Assuming you are using PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agentID }), // Include agentID in the request body
    })
      .then((response) => response.json())
      .then(() => {
        // Update the status of the disapproved agent
        const updatedAgents = agents.map((agent) =>
          agent.agentID === agentID
            ? { ...agent, isVerified: "Not Approved" }
            : agent
        );
        setAgents(updatedAgents);
      })
      .catch((error) => {
        console.error("Error disapproving agent:", error);
      });
  };

  return (
    <div className="ApproveAgentsWhole">
      <AdminHome />
      <div className="approve-agents-contents">
        <div className="approve-agents-container">
          <h2 className="approveTravelAgentsH2">Travel Agents Requests</h2>
        </div>
        <div className="agents-listApproval">
          {agents.map((agent) => (
            <div key={agent.agentID} className="agent-card">
              <h3 className="TravelAgentsNameInCard">{agent.agentName}</h3>
              <p>
                <strong>Email:</strong> {agent.email}
              </p>
              <p>
                <strong>Company Name:</strong> {agent.companyName}
              </p>
              <p>
                <strong>Company Address:</strong> {agent.address}
              </p>
              <p>
                <strong>Status:</strong> {agent.isVerified}
              </p>
              <p>
                <strong>Company Reg No:</strong>{" "}
                {agent.companyRegistrationNumber}
              </p>
              <p>
                <strong>Phone Number:</strong> {agent.phoneNumber}
              </p>

              <div className="agent-buttons">
                <button
                  className="ApproveAgentApproveButton"
                  onClick={() => handleApprove(agent.agentID)}
                >
                  Approve
                </button>
                <button
                  className="ApproveAgentDisApproveButton"
                  onClick={() => handleDisapprove(agent.agentID)}
                >
                  Disapprove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Request;

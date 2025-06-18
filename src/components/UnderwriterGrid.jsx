import React,{useState} from "react";
import "../styles/UnderwriterGrid.css"; // We'll define CSS separately
import { Link } from "react-router-dom";
import AgentNewFormModal from "./AgentNewFormModal"; // Import the modal component
import AIDecisionSummaryModal from "./AIDecisionSummary";

const UnderwriterGrid = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const data = [
    { id: 1, driverName: "Alice", licenceNumber: "xxxxxxx", state: "Connecticut",vechicleModel: "Toyota Camry", vehicleMake: "Toyota", vehicleMakeYear: 2020, status: "Submitted - Pending Review" },
    // Sample data, replace xxxxxxx with actual licence numbers
    { id: 2, driverName: "Bob", licenceNumber: "xxxxxxx", state: "New York", vechicleModel: "Honda Accord", vehicleMake: "Honda", vehicleMakeYear: 2019, status: "Submitted - Pending Review" },
    { id: 3, driverName: "Charlie", licenceNumber: "xxxxxxx", state: "New York", vechicleModel: "Ford Focus", vehicleMake: "Ford", vehicleMakeYear: 2021,   status: "Review Completed" }

  ];

  const handleSummary = (event) => {
    event.preventDefault(); 
    openModal();
    }

  return (
    <div style={{ padding: 0,  top:60, left:10, right:0,  marginBottom:"50px", position:"absolute", width:"95%", height:"100%" }}>
      <div className="agentGridContainer">
           
      </div>
         
      <table border="1" cellPadding="10" cellSpacing="0" className="agentGridTable">
    
        <thead>
          <tr>
            <th>Driver Name</th>
            <th>Licence Number</th>
            <th>State</th>
            <th>Vehicle Model</th>
            <th>Vehicle Make</th>
            <th>Vehicle Make Year</th>
            <th>Recommendation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.driverName}</td>
              <td>{user.licenceNumber}</td>
              <td>{user.state}</td>
              <td>{user.vechicleModel}</td>
              <td>{user.vehicleMake}</td>
              <td>{user.vehicleMakeYear}</td>
                <td><Link onClick={handleSummary}>*AI Decision Summary</Link></td>
                <td className="divAction"><div><button className="buttonApprove">Approve</button><button className="buttonReject">Reject</button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
        
      <AIDecisionSummaryModal isOpen={isOpen} closeModal={closeModal} />
      <div className="divFooter">
        <p>© 2023 Underwriter Knights. All rights reserved.</p>

        </div>
    </div>
  );
};
export default UnderwriterGrid;

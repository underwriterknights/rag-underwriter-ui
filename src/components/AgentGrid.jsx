import React,{useState} from "react";
import "../styles/AgentGrid.css"; // We'll define CSS separately
import { Link } from "react-router-dom";
import AgentNewFormModal from "./AgentNewFormModal"; // Import the modal component

const AgentGrid = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const data = [
    { id: 1, driverName: "Alice", licenceNumber: "xxxxxxx", state: "Connecticut",vechicleModel: "Toyota Camry", vehicleMake: "Toyota", vehicleMakeYear: 2020, status: "Submitted - Pending Review" },
    // Sample data, replace xxxxxxx with actual licence numbers
    { id: 2, driverName: "Bob", licenceNumber: "xxxxxxx", state: "New York", vechicleModel: "Honda Accord", vehicleMake: "Honda", vehicleMakeYear: 2019, status: "Submitted - Pending Review" },
    { id: 3, driverName: "Charlie", licenceNumber: "xxxxxxx", state: "New York", vechicleModel: "Ford Focus", vehicleMake: "Ford", vehicleMakeYear: 2021,   status: "Review Completed" },
    { id: 4, driverName: "David", licenceNumber: "xxxxxxx", state: "Connecticut", vechicleModel: "Chevrolet Malibu", vehicleMake: "Chevrolet", vehicleMakeYear: 2018, status: "Review Completed" },
    { id: 5, driverName: "Eve", licenceNumber: "xxxxxxx", state: "New York", vechicleModel: "Nissan Altima", vehicleMake: "Nissan", vehicleMakeYear: 2022, status: "Submitted - Pending Review" },
    { id: 6, driverName: "Frank", licenceNumber: "xxxxxxx", state: "Connecticut", vechicleModel: "Hyundai Sonata", vehicleMake: "Hyundai", vehicleMakeYear: 2020, status: "Review Completed" },
    { id: 7, driverName: "Grace", licenceNumber: "xxxxxxx", state: "New York", vechicleModel: "Kia Optima", vehicleMake: "Kia", vehicleMakeYear: 2019, status: "Submitted - Pending Review" },
    { id: 8, driverName: "Hank", licenceNumber: "xxxxxxx", state: "Connecticut", vechicleModel: "Volkswagen Passat", vehicleMake: "Volkswagen", vehicleMakeYear: 2021, status: "Review Completed" },
    { id: 9, driverName: "Ivy", licenceNumber: "xxxxxxx", state: "New York", vechicleModel: "Subaru Legacy", vehicleMake: "Subaru", vehicleMakeYear: 2020, status: "Submitted - Pending Review" },
    { id: 10, driverName: "Jack", licenceNumber: "xxxxxxx", state: "Connecticut", vechicleModel: "Mazda6", vehicleMake: "Mazda", vehicleMakeYear: 2018, status: "Review Completed" },

  ];

  return (
    <div style={{ padding: 0,  top:60, left:10, right:0,  marginBottom:"50px", position:"absolute", width:"95%", height:"100%" }}>
      <div className="agentGridContainer">
        <div className="buttonContainer">
          {/* <span className="spanAddnew">+</span> */}
          <Link className="buttonSubmitNew" onClick={openModal} >Submit New Review</Link>
        </div>      
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
            <th>UW Review Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.driverName}</td>
              <td><Link onClick={openModal}>{user.licenceNumber}</Link></td>
              <td>{user.state}</td>
              <td>{user.vechicleModel}</td>
              <td>{user.vehicleMake}</td>
              <td>{user.vehicleMakeYear}</td>
                <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AgentNewFormModal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};
export default AgentGrid;

import React,{useEffect, useState} from "react";
import "../styles/AgentGrid.css"; // We'll define CSS separately
import { Link } from "react-router-dom";
import AgentNewFormModal from "./AgentNewFormModal"; // Import the modal component
import {GetAgentData} from "../service/api"

const AgentGrid = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [agentData, setAgentData] = useState([]);
  let agentUserName = JSON.parse(localStorage.getItem("loggedUser")).username;
  const [modalData, setModalData] = useState(
    {
      isOpen:false,
      data:null,
      isViewOnly:false
    }
  )
  useEffect(()=>{
   fetchData();
  },[])

  const fetchData = ()=>{
    GetAgentData().then((response)=>{
    if(response && response.length > 0)
    {
      let currentAgentData = response.filter(res=>res.agentUserName===agentUserName)
      setAgentData(currentAgentData);
    }else{
      alert(response.message)
    }
   })
  }
  const handleRefreshData = ()=>{
     fetchData();
  }

  const handleModalOpen = (event, data, isViewOnly) =>{
    setModalData({
      isOpen:true,
      data: data,
      isViewOnly: isViewOnly
    })
  }
  return (
    <div style={{ padding: 0,  top:60, left:10, right:0,  marginBottom:"50px", position:"absolute", width:"95%", height:"100%" }}>
      <div className="agentGridContainer">
        <div className="buttonContainer">          
          <Link className="buttonSubmitNew" onClick={(event)=>{handleModalOpen(event,null,false)}} >Submit New Review</Link>
          <button className="btnRefresh" onClick={handleRefreshData}>Refresh Data</button>
        </div>       
      </div>         
     {agentData.length>0 ? <table border="1" cellPadding="10" cellSpacing="0" className="agentGridTable">    
        <thead>
          <tr>
            <th>Driver Name</th>
            <th>Licence Number</th>
            <th>State</th>
            <th>Vehicle Make</th>
            <th>Vehicle Model</th>            
            <th>Vehicle Make Year</th>
            <th>UW Review Status</th>
          </tr>
        </thead>
        <tbody>
          {agentData.map((data) => (
            <tr key={data.licenseNumber}>
              <td>{data.fullName}</td>
              <td><Link className="viewDataLink" onClick={(event)=>{handleModalOpen(event,data,true)}}>{data.licenseNumber}</Link></td>
              <td>{data.state}</td>
               <td>{data.make}</td>
              <td>{data.model}</td>             
              <td>{data.year}</td>
                <td>{data.status}</td>
            </tr>
          ))}
        </tbody>
      </table>:<div className="divNoData"><h4 className="noData">No Data Found</h4></div>}
      <AgentNewFormModal modalData={modalData} setModalData={setModalData} fetchData ={fetchData}/>
    </div>
  );
};
export default AgentGrid;

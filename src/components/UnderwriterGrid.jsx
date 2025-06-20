import React,{useState,useEffect } from "react";
import "../styles/UnderwriterGrid.css"; // We'll define CSS separately
import { Link } from "react-router-dom";
import AgentNewFormModal from "./AgentNewFormModal"; // Import the modal component
import AIDecisionSummaryModal from "./AIDecisionSummary";
import {GetAgentData, UpdateAgentData} from "../service/api"

const UnderwriterGrid = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal=() =>{setIsOpen(true)}
  const closeModal=()=>{setIsOpen(false)}
  const [showSummary,setShowSummary] = useState(false)
  const [summaryData, setSummaryData] = useState(null);
  const [agentData, setAgentData] = useState([]);
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
          setAgentData(response.filter(res=>res.status=="Submitted"));
        }else{
          alert(response.message)
        }
       })
      } 

      const closeSummary = ()=>{
        closeModal()
        setShowSummary(false)
        setSummaryData(null)    
}

  const handleModalOpen = (event, data, isViewOnly) =>{
    setModalData({
      isOpen:true,
      data: data,
      isViewOnly: isViewOnly
    })
  }

  const handleSummary = (event,data) => {
    event.preventDefault(data); 
    setSummaryData(data)
    openModal();
    }

  useEffect(()=>{
   if(summaryData && isOpen)
    setShowSummary(true);

  },summaryData)
  const handleRefreshData = ()=>{
     fetchData();
  }

  const handleActions = (event, data)=>{
    let updatedData = {
      licenseNumber: data.licenseNumber,
      status: event.target.id=="btnApprove"?"Approve":"Reject"
    }
    UpdateAgentData(updatedData).then((response)=>{
      if(response && response[0]!="Update is completed")
        alert(response[0])
      else
      fetchData();
    })
  }

  return (
    <div style={{ padding: 0,  top:60, left:10, right:0,  marginBottom:"50px", position:"absolute", width:"95%", height:"100%" }}>
      <div className="agentGridContainer">
           <div className="buttonContainer">          
                     <button className="btnRefresh" onClick={handleRefreshData}>Refresh Data</button>
          </div> 
      </div>
         
      {agentData.length?<table border="1" cellPadding="10" cellSpacing="0" className="agentGridTable">
    
        <thead>
          <tr>
            <th>Driver Name</th>
            <th>License Number</th>
            <th>State</th>
            <th>Vehicle Make</th>
            <th>Vehicle Model</th>
            
            <th>Vehicle Make Year</th>
            <th>Recommendation</th>
            <th>Actions</th>
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
                <td><Link onClick={((e)=>handleSummary(e,data))}>*AI Decision Summary</Link></td>
                <td className="divAction"><div><button id="btnApprove" className="buttonApprove" onClick={(e)=>{handleActions(e, data)}}>Approve</button>
                <button id="btnReject" className="buttonReject" onClick={(e)=>{handleActions(e, data)}}>Reject</button></div></td>
            </tr>
          ))}
        </tbody>
      </table>: <div className="divNoData"><h4 className="noData">No Pending Reviews</h4></div>}
      <AgentNewFormModal modalData={modalData} setModalData={setModalData} fetchData ={fetchData}/>
      <AIDecisionSummaryModal showSummary={showSummary} closeSummary={closeSummary} summaryData={summaryData}/>
     
    </div>
  );
};
export default UnderwriterGrid;

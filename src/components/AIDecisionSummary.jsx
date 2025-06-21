import React, { useEffect, useState } from "react";
import "../styles/AIDecisionSummary.css"; // Optional CSS styling
import { GetUWDecisions } from "../service/api";
import Loader from "./Loader";

const AIDecisionSummaryModal = (props) => {
  const [displayData,setDisplayData] = useState(null)
  const [inputFactors,setInputFactors] = useState(null);

  const [loading, setLoading] = useState(false);

function getAge(birth) {
  let ageMS = Date.parse(Date()) - Date.parse(birth);
  let age = new Date();
  age.setTime(ageMS);
  let ageYear = age.getFullYear() - 1970;

  return ageYear;

  // ageMonth = age.getMonth(); // Accurate calculation of the month part of the age
  // ageDay = age.getDate();    // Approximate calculation of the day part of the age
}
  useEffect(() => {
    if (props.summaryData) {

      
      let inputReq = {
        vehicle_age: (new Date().getFullYear() - props.summaryData.year),
        annual_mileage: parseInt(props.summaryData.mileage),
        claim_history: 1,
        driver_experience: parseInt(props.summaryData.yearsOfExperience),
        driver_age: getAge(props.summaryData.dateOfBirth),
        vehicle_type: "SUV",
        vehicle_make: props.summaryData.make,
        vehicle_model: props.summaryData.model,
        comprehensive_coverage: props.summaryData.comprehensiveCoverage,
        collision_coverage: props.summaryData.collisionCoverage,
        deductible: parseInt(props.summaryData.collisionDeductible.toString().replace("$","")),
        region: props.summaryData.state,
        usage_type: props.summaryData.usage,
      };
      setLoading(true);
       GetUWDecisions(inputReq).then((response)=>{
        setLoading(false)
        if(response && response.risk_level){
          setInputFactors(Object.entries(inputReq))
          setDisplayData({
            riskLevel : response.risk_level,
            decisionTxt: response.explanation
          })
        }else{
          alert("Error occured during evaluating the risks")
        }
          
      }).catch((error)=>{
        alert("Error occured during evaluating the risks. " - error)
         setLoading(false)
      });
    }
    
  }, [props.summaryData]);

 const closeModel=() =>{
  props.closeSummary();
  setDisplayData(null);
  setInputFactors(null);
 }
  return (
    <div>
      {props.showSummary && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Evaluation Summary</h2>
              {loading ? <Loader />:
             <div className="overflow-x-auto">
              <p className="decisionText">**{displayData?.decisionTxt}**</p>
               <div className="divRisk">
                 <p style={{fontWeight:"bold", marginRight: "10px", marginBottom:"-10px"}}>Risk Level: </p>
                  <p>{displayData?.riskLevel}</p>
               </div> 

       {displayData &&<h3 style={{marginBottom:"5px"}}>The factors impacted:</h3>}
      <table className="min-w-full divide-y divide-gray-300 text-sm">
        <tbody className="divide-y divide-gray-200">
          {inputFactors && inputFactors.map(([key, value]) => (
            <tr key={key} className="hover:bg-gray-50">
              <td className="px-4 py-2 capitalize">
                {key.replace(/_/g, " ")}:
              </td>
              <td className="px-4 py-2 whitespace-nowrap">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
             </div>}

              <button className="close-button" onClick={closeModel}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDecisionSummaryModal;

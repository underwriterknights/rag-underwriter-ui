import React, { useState } from "react";
import "../styles/AIDecisionSummary.CSS"; // Optional CSS styling

const AIDecisionSummaryModal = (props) => {

   return (
    <div>   
      {props.isOpen && (
        <div className="modal-overlay">
          <div className="modal">
          
            <div className="modal-header">
              <h2>AI Decision Summary</h2>  
                <button className="close-button" onClick={props.closeModal}>
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

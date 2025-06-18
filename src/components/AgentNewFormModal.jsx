import React, { useState } from "react";
import "../styles/AgentModal.css"; // Optional CSS styling

const AgentNewFormModal = (props) => {

  let initialFormData = {
     fullName: "",
    dateOfBirth: "",
    licenseNumber: "",
    licenseState: "",
    yearsOfExperience: "",
    hasAccidents: "",
    make: "",
    model: "",
    year: "",
    vin: "",
    usage: "personal",
    mileage: "",
    ownership: "owned",
     street: "",
    city: "",
    state: "",
    zip: "",
    county: "",
    residenceType: "own",
    garageParking: "yes",

    liabilityBodilyInjury: "",
    liabilityPropertyDamage: "",
    collisionCoverage: "",
    collisionDeductible: "500",
    comprehensiveCoverage: "",
    comprehensiveDeductible: "$500",
    roadsideAssistance: false,
    rentalReimbursement: false,
  }

  const[driverUpload, setDriverUpload] = useState(false);
  const[vehicleUpload, setVehicleUpload] = useState(false);
  const[locationUpload, setLocationUpload] = useState(false);
  const[coverageUpload, setCoverageUpload] = useState(false);

   const [formData, setFormData] = useState(initialFormData);

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setSubmitted(true);
    document.getElementById("agentForm").reset(); // Reset the form after submission
    setFormData(initialFormData); // Reset the form data state
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (e.target.name === "driverUpload") {
          setDriverUpload(true);
          setFormData({ ...formData, driverFile: reader.result });
        } else if (e.target.name === "vehicleUpload") {
          setVehicleUpload(true);
          setFormData({ ...formData, vehicleFile: reader.result });
        }
        else if (e.target.name === "locationUpload") {

          setLocationUpload(true);
          setFormData({ ...formData, locationFile: reader.result });
        }
        else if (e.target.name === "coverageUpload") {
          setCoverageUpload(true);
          setFormData({ ...formData, coverageFile: reader.result });
        }
      }
      reader.readAsDataURL(file); // Convert the file to base64 string
    }
  }

  const handleClose = () => {
    props.closeModal(); 
    setFormData(initialFormData); // Reset the form data state when closing the modal
    setDriverUpload(false); 
    setVehicleUpload(false);
    setLocationUpload(false);
    setCoverageUpload(false);
    setSubmitted(false); // Reset the submitted state when closing the modal
  };

  return (
    <div>   
      {props.isOpen && (
        <div className="modal-overlay">
          <div className="modal">
          
             <div style={{ maxWidth: "100%", margin: "0 20px",paddingBottom: "20px" }}>
                <form onSubmit={handleSubmit} id="agentForm" className="agentForm">
                  <div className="driverForm">
                    <div style={{minWidth: "60%"}}>
                       <h2>Driver Information</h2>

  <div className="form-group">
    <label htmlFor="fullName">Full Name:</label>
    <input type="text" name="fullName" required={!driverUpload} value={formData.fullName} onChange={handleChange} />
  </div>

  <div className="form-group">
    <label htmlFor="dateOfBirth">Date of Birth:</label>
    <input type="date" name="dateOfBirth" required={!driverUpload} value={formData.dateOfBirth} onChange={handleChange} />
  </div>

  <div className="form-group">
    <label htmlFor="licenseNumber">License Number:</label>
    <input type="text" name="licenseNumber" required={!driverUpload} value={formData.licenseNumber} onChange={handleChange} />
  </div>  
    <div className="form-group">
    <label htmlFor="licenseNumber">License State:</label>
    <input type="text" name="licenseState" required={!driverUpload} value={formData.licenseState} onChange={handleChange} />
  </div>  
  <div className="form-group">
    <label htmlFor="licenseNumber">Years of Driving Experience:</label>
    <input type="text" name="yearsOfExperience" required={!driverUpload} value={formData.yearsOfExperience} onChange={handleChange} />
  </div> 

    <div className="form-group">
    <label htmlFor="licenseNumber">Any Accidents in Last 3 Years?</label>
    <select name="hasAccidents" required={!driverUpload} value={formData.hasAccidents} onChange={handleChange}>
      <option value="" disabled selected>Select an option</option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
  </div> 
                    </div>
                    <div className="uploadDriver">
                        <label for="avatar">Upload Driver Licence Image/Document:</label>
                    <input type="file" id="driverUpload" name="driverUpload" onChange={handleFileUpload}  />
                    </div>
                  
                  </div>
                  <div className="vechicleForm">
                    <div style={{minWidth: "60%"}}>
<h2>Vehicle Information</h2>
   <div className="form-group">
    <label htmlFor="make">Make:</label>
    <input type="text" name="make" required={!vehicleUpload}  value={formData.make} onChange={handleChange} />
  </div>

  <div className="form-group">
    <label htmlFor="model">Model:</label>
    <input type="text" name="model" required={!vehicleUpload}   value={formData.model} onChange={handleChange} />
  </div>

  <div className="form-group">
    <label htmlFor="year">Year:</label>
    <input type="number" name="year" required={!vehicleUpload}   value={formData.year} onChange={handleChange} />
  </div>

  <div className="form-group">
    <label htmlFor="vin">VIN (Vehicle ID):</label>
    <input type="text" name="vin" required={!vehicleUpload}   value={formData.vin} onChange={handleChange} />
  </div>

  <div className="form-group">
    <label htmlFor="usage">Usage:</label>
    <select name="usage" value={formData.usage} required={!vehicleUpload}   onChange={handleChange}>
      <option value="" disabled selected>Select an option</option>
      <option value="personal">Personal</option>
      <option value="business">Business</option>
      <option value="commercial">Commercial</option>
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="mileage">Estimated Annual Mileage:</label>
    <input type="number" name="mileage" required={!vehicleUpload}   value={formData.mileage} onChange={handleChange} />
  </div>

  <div className="form-group">
    <label htmlFor="ownership">Ownership Type:</label>
    <select name="ownership" required={!vehicleUpload}   value={formData.ownership} onChange={handleChange}>
      <option value="" disabled selected>Select an option</option>
      <option value="owned">Owned</option>
      <option value="leased">Leased</option>
      <option value="financed">Financed</option>
    </select>
  </div>
                    </div>

  <div className="uploadVechicle">
    <label htmlFor="vehicleImage">Upload Vehicle Details Document:</label>   
    <input type="file" id="vehicleUpload" name="vehicleUpload" onChange={handleFileUpload}   />
        </div>
                  </div>
    
   <div className="locationForm">
    <div style={{minWidth: "60%"}}>
<h2>Location Information</h2>
  <div className="form-group">
      <label htmlFor="street">Street Address:</label>
      <input type="text" name="street" id="street" required={!locationUpload}   value={location.street} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="city">City:</label>
      <input type="text" name="city" id="city" required={!locationUpload}   value={location.city} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="state">State:</label>
      <input type="text" name="state" id="state" required={!locationUpload}   value={location.state} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="zip">ZIP Code:</label>
      <input type="text" name="zip" id="zip" required={!locationUpload}   value={location.zip} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="county">County:</label>
      <input type="text" name="county" id="county" required={!locationUpload}  value={location.county} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="residenceType">Residence Type:</label>
      <select name="residenceType" id="residenceType" required={!locationUpload}   value={location.residenceType} onChange={handleChange}>
       <option value="" disabled selected>Select an option</option>
        <option value="own">Own</option>
        <option value="rent">Rent</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="garageParking">Garage Parking Available?</label>
      <select name="garageParking" id="garageParking" required={!locationUpload}   value={location.garageParking} onChange={handleChange}>
        <option value="" disabled selected>Select an option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
    </div>
    <div className="uploadLocation">
      <label htmlFor="locationImage">Upload Location Document(Address Proof):</label> 
      <input type="file" id="locationUpload" name="locationUpload" onChange={handleFileUpload}   />
      </div>
    </div>


<div  className="coverageForm">
  <div style={{minWidth: "60%"}}>
<h2>Coverage Information</h2>
 <div className="form-group">
      <label htmlFor="liabilityBodilyInjury">Bodily Injury Liability (per person/per accident):</label>
      <select
        name="liabilityBodilyInjury"
        id="liabilityBodilyInjury"
        value={formData.liabilityBodilyInjury}
        onChange={handleChange}
        required={!coverageUpload}    
      >
        <option value="" disabled selected>Select an option</option>
        <option value="$25,000/$50,000">$25,000/$50,000</option>
        <option value="$50,000/$100,000">$50,000/$100,000</option>
        <option value="$100,000/$300,000">$100,000/$300,000</option>
        <option value="$250,000/$500,000">$250,000/$500,000</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="liabilityPropertyDamage">Property Damage Liability (in $000s):</label>
      <select
        name="liabilityPropertyDamage"
        id="liabilityPropertyDamage"
        value={formData.liabilityPropertyDamage}
        onChange={handleChange}
           required={!coverageUpload}  
      >
        <option value="" disabled selected>Select an option</option>
        <option value="$25,000">$25,000</option>
        <option value="$50,000">$50,000</option>
        <option value="$100,000">$100,000</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="collisionCoverage">Collision Coverage:</label>
      <select
        name="collisionCoverage"
        id="collisionCoverage"
        value={formData.collisionCoverage}
        onChange={handleChange}
           required={!coverageUpload}  
      >
        <option value="" disabled selected>Select an option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="collisionDeductible">Collision Deductible:</label>
      <select
        name="collisionDeductible"
        id="collisionDeductible"
        value={formData.collisionDeductible}
        onChange={handleChange}
           required={!coverageUpload}  
      >
        <option value="" disabled selected>Select an option</option>
        <option value="$250">$250</option>
        <option value="$500">$500</option>
        <option value="$1000">$1000</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="comprehensiveCoverage">Comprehensive Coverage:</label>
      <select
        name="comprehensiveCoverage"
        id="comprehensiveCoverage"
        value={formData.comprehensiveCoverage}
        onChange={handleChange}
           required={!coverageUpload}  
      >
        <option value="" disabled selected>Select an option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="comprehensiveDeductible">Comprehensive Deductible:</label>
      <select
        name="comprehensiveDeductible"
        id="comprehensiveDeductible"
        value={formData.comprehensiveDeductible}
        onChange={handleChange}
         required={!coverageUpload}  
      >
        <option value="" disabled selected>Select an option</option>
        <option value="$250">$250</option>
        <option value="$500">$500</option>
        <option value="$1000">$1000</option>
      </select>
    </div>

    <div className="form-group checkbox-group">
      <input
        type="checkbox"
        id="roadsideAssistance"
        name="roadsideAssistance"
        checked={formData.roadsideAssistance}
        onChange={handleChange}
          required={!coverageUpload}  
      />
      <label htmlFor="roadsideAssistance">Add Roadside Assistance</label>
    </div>

    <div className="form-group checkbox-group">
      <input
        type="checkbox"
        id="rentalReimbursement"
        name="rentalReimbursement"
        checked={formData.rentalReimbursement}
        onChange={handleChange}
           required={!coverageUpload}   
      />
      <label htmlFor="rentalReimbursement">Add Rental Reimbursement</label>
    </div>
  </div>
  <div className="uploadCoverage">
    <label htmlFor="coverageImage">Upload Coverage Document:</label>
    <input type="file" id="coverageUpload" name="coverageUpload" onChange={handleFileUpload}  />
    </div>
  </div>
    
     <div className="submitButtonContainer"> 
          <button type="submit" className="buttons">Submit For Review</button>
          <button onClick={handleClose} className="buttons">Cancel</button>
        </div>
        
      </form>

      {submitted && <p style={{ color: "green", marginTop: "20px" }}>Form successfully submitted for Underwriter Review!</p>}
    </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentNewFormModal;

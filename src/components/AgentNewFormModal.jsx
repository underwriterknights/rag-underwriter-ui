import React, { useEffect, useState } from "react";
import "../styles/AgentModal.css"; // Optional CSS styling
import {SaveAgentDataApi} from "../service/api"
import AWS from "aws-sdk";
import { Link } from "react-router-dom";
import {v4 as uuidv4} from 'uuid'
import { accessKeyId, secretAccessKey,region,bucketName } from "../constants";
const AgentNewFormModal = (props) => {
  let initialFormData = {
    id:"",
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
    usage: "",
    mileage: "",
    ownership: "",
     street: "",
    city: "",
    state: "",
    zip: "",
    county: "",
    residenceType: "",
    garageParking: "",

    liabilityBodilyInjury: "",
    liabilityPropertyDamage: "",
    collisionCoverage: "",
    collisionDeductible: "",
    comprehensiveCoverage: "",
    comprehensiveDeductible: "",
    roadsideAssistance: false,
    rentalReimbursement: false,
    status:"Submitted",
    driverFileName: "",
    locationFileName: "",
    vehicleFileName: "",
    coverageFileName: ""
  }

  const[driverUpload, setDriverUpload] = useState(false);
  const[vehicleUpload, setVehicleUpload] = useState(false);
  const[locationUpload, setLocationUpload] = useState(false);
  const[coverageUpload, setCoverageUpload] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

   const [formData, setFormData] = useState(props.modalData && 
    props.modalData.data?props.modalData.data:initialFormData);

  const [submitted, setSubmitted] = useState(false);

  useEffect(()=>{
    if(props.modalData?.data) 
     setFormData(props.modalData.data)
  },[props.modalData?.data])

  const handleChange = (e) => {
    setSubmitted(false);
    let value =e.target.value;
    if(e.target.name=="roadsideAssistance" || e.target.name=="rentalReimbursement")
      value = e.target.checked

    setFormData({ ...formData, [e.target.name]:  value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
      let uniqueId = uuidv4();
      formData.id = uniqueId;
    if(uploadedFiles.length > 0){    
      uploadedFiles.forEach(async(file,index) => {
         file.fileName = uniqueId +"_" + file.fileName;
         await  uploadFileToS3(file).then((s3FileName)=>{
            formData[file.payloadName] = s3FileName;
            if(index==uploadedFiles.length-1)
              saveFormData(formData);
         })
                
      });         
      
    }else{
      saveFormData(formData);
    }
    
   
  };

  const saveFormData = (saveInput) =>{
    SaveAgentDataApi(saveInput).then((reponse)=>{
      setSubmitted(true);
      document.getElementById("agentForm").reset(); // Reset the form after submission
      setUploadedFiles([])
     setFormData(initialFormData); // Reset the form data state when closing the modal
     setDriverUpload(false); 
     setVehicleUpload(false);
     setLocationUpload(false);
     setCoverageUpload(false);
      props.fetchData();  
    }).catch((error)=>{
      alert('Error occured during save data' + error)
    })
  }

   const uploadFileToS3 = async (file) => {
   return new Promise(async(resolve,reject)=>{
     
  
      // S3 Credentials
      AWS.config.update({
            accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      });
      const s3 = new AWS.S3({
        params: { Bucket: bucketName },
        region: region,
      });
  
      // Files Parameters
  
      const paramsObject = {
        Bucket: S3_BUCKET,
        Key: file.fileName,
        Body: file.file,
      };
  
      
  
      // Uploading file to s3
  
      var uploadFile = s3
        .putObject(paramsObject)
        .on("httpUploadProgress", (evt) => {
          // File uploading progress
          console.log(
            "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
          );
        })
        .promise();
  
      await uploadFile.then((err, data) => {
        if(err.err)
          reject("error occured" + err.err)
        resolve(file.fileName)
      });
    });
    };

  const handleFileUpload = (e) => {
    const file = e.target.files[0]; 
    if (file) {
    
        if (e.target.name === "driverUpload") {
          setDriverUpload(true);
          captureFile("driverInfo.pdf","driverFileName",file)
        } else if (e.target.name === "vehicleUpload") {
          setVehicleUpload(true);
           captureFile("vehicleInfo.pdf","vehicleFileName",file)
        }
        else if (e.target.name === "locationUpload") {          
          setLocationUpload(true);
           captureFile("locationInfo.pdf","locationFileName",file)          
        }
        else if (e.target.name === "coverageUpload") {
          setCoverageUpload(true);
          captureFile("coverageInfo.pdf","coverageFileName",file)    
        }
      
 // Convert the file to base64 string
    }
  }

  const captureFile = (fileName, payloadName, file) =>{
     const previousFile = uploadedFiles.find((item) =>
      item.fileName === fileName
    );
    if(previousFile){
      previousFile.file = file;
      setUploadedFiles(previousFile)
    }else{
      setUploadedFiles([...uploadedFiles,{
            fileName:fileName,
              payloadName:payloadName,
            file:file
          }])
    }
    
  }

  const handleClose = (event) => {       
    props.setModalData({
    isOpen:false,
    data:null
    })
    setUploadedFiles([])
    setFormData(initialFormData); // Reset the form data state when closing the modal
    setDriverUpload(false); 
    setVehicleUpload(false);
    setLocationUpload(false);
    setCoverageUpload(false);
    setSubmitted(false); // Reset the submitted state when closing the modal
  };

        
AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
    });

    const s3 = new AWS.S3();

  const downloadS3Document=async (event,fileName)=>{

      const params = {
        Bucket: bucketName,
        Key: fileName, // The full path to the file in your S3 bucket
      };

      try {
        const data = await s3.getObject(params).promise();
        // data.Body will contain the file content
        // You can then process it, e.g., convert to a Blob and create a download link
        const blob = new Blob([data.Body], { type: data.ContentType });
        const url = URL.createObjectURL(blob);

        // Example: Create a temporary link and trigger download
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // Use the file name as download name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

      } catch (err) {
        console.error('Error retrieving file from S3:', err);
      }
    
  }

  return (
    <div>   
      {props.modalData?.isOpen && (
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
                    {!props.modalData?.isViewOnly &&<div className="uploadDriver">
                        <label for="avatar">Upload Driver Licence Image/Document:</label>
                    <input type="file" id="driverUpload" name="driverUpload" onChange={handleFileUpload}  />
                    </div>}

                      {
      (props.modalData?.isViewOnly && formData.driverFileName) &&
      <div className="uploadDriver">
    <label htmlFor="avatar">Download Driver Document:</label>
    <Link onClick={(e)=>downloadS3Document(e,formData.driverFileName)}>{formData.driverFileName}</Link> 
    </div>
    }
                  
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

  {!props.modalData?.isViewOnly &&<div className="uploadVechicle">
    <label htmlFor="vehicleImage">Upload Vehicle Details Document:</label>   
    <input type="file" id="vehicleUpload" name="vehicleUpload" onChange={handleFileUpload}   />
        </div>}
        {
      (props.modalData?.isViewOnly && formData.vehicleFileName) &&
      <div className="uploadVechicle">
    <label htmlFor="vehicleImage">Download Vehicle Document:</label>
    <Link onClick={(e)=>downloadS3Document(e,formData.vehicleFileName)}>{formData.vehicleFileName}</Link> 
    </div>
    }
                  </div>
    
   <div className="locationForm">
    <div style={{minWidth: "60%"}}>
<h2>Location Information</h2>
  <div className="form-group">
      <label htmlFor="street">Street Address:</label>
      <input type="text" name="street" id="street" required={!locationUpload}   value={formData.street} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="city">City:</label>
      <input type="text" name="city" id="city" required={!locationUpload}   value={formData.city} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="state">State:</label>
      <input type="text" name="state" id="state" required={!locationUpload}   value={formData.state} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="zip">ZIP Code:</label>
      <input type="text" name="zip" id="zip" required={!locationUpload}   value={formData.zip} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="county">County:</label>
      <input type="text" name="county" id="county" required={!locationUpload}  value={formData.county} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="residenceType">Residence Type:</label>
      <select name="residenceType" id="residenceType" required={!locationUpload}   value={formData.residenceType} onChange={handleChange}>
       <option value="" disabled selected>Select an option</option>
        <option value="own">Own</option>
        <option value="rent">Rent</option>
        <option value="other">Other</option>
      </select>
    </div>

    <div className="form-group">
      <label htmlFor="garageParking">Garage Parking Available?</label>
      <select name="garageParking" id="garageParking" required={!locationUpload}   value={formData.garageParking} onChange={handleChange}>
        <option value="" disabled selected>Select an option</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    </div>
    </div>
    {!props.modalData?.isViewOnly && <div className="uploadLocation">
      <label htmlFor="locationImage">Upload Location Document(Address Proof):</label> 
      <input type="file" id="locationUpload" name="locationUpload" onChange={handleFileUpload}   />
      </div>}

      {
      (props.modalData?.isViewOnly && formData.locationFileName) &&
      <div className="uploadLocation">
    <label htmlFor="locationImage">Download Location Document:</label>
    <Link onClick={(e)=>downloadS3Document(e,formData.locationFileName)}>{formData.locationFileName}</Link> 
    </div>
    }
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
      />
      <label htmlFor="rentalReimbursement">Add Rental Reimbursement</label>
    </div>
  </div>
  {!props.modalData?.isViewOnly && <div className="uploadCoverage">
    <label htmlFor="coverageImage">Upload Coverage Document:</label>
    <input type="file" id="coverageUpload" name="coverageUpload" onChange={handleFileUpload}  />
    </div>}

    {
      (props.modalData?.isViewOnly && formData.coverageFileName) &&
      <div className="uploadCoverage">
    <label htmlFor="coverageImage">Download Coverage Document:</label>
    <Link onClick={(e)=>downloadS3Document(e,formData.coverageFileName)}>{formData.coverageFileName}</Link> 
    </div>
    }

  </div>    
     <div className="submitButtonContainer"> 
          <button type="submit" name="submitButton" id="submitButton" hidden={props.modalData?.isViewOnly} className="buttons">Submit For Review</button>
          <button type="button" id="cancelButton" onClick={handleClose} className="buttons">Close</button>
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

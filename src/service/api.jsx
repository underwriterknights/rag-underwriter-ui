
import axios from 'axios';


 export const RegisterUserApi = async (newUserdetails) => {

  const url = 'http://127.0.0.1:8000/register';
  try {
    const response = await axios.post(url, newUserdetails, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Rethrow the error for further handling
  }
}

export const UserLoginApi = async (userdetail) => {

  const url = 'http://127.0.0.1:8000/login';
  try {
    const response = await axios.post(url, userdetail, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error login user:', error);
    throw error; // Rethrow the error for further handling
  }
}

 export const SaveAgentDataApi = async (agentInputData) => {

  const url = 'http://127.0.0.1:8000/saveData';
  try {
    const response = await axios.post(url, agentInputData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error saving agent data:', error);
    throw error; // Rethrow the error for further handling
  }
}

export const GetAgentData = async () => {

  const url = 'http://127.0.0.1:8000/getData';
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error retriving agent data:', error);
    throw error; // Rethrow the error for further handling
  }
}

export const UpdateAgentData = async (updatedData) => {

  const url = 'http://127.0.0.1:8000/updateStatus';
  try {
    const response = await axios.put(url,updatedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error updating status:', error);
    throw error; // Rethrow the error for further handling
  }
}


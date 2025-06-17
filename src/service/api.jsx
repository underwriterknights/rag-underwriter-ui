
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


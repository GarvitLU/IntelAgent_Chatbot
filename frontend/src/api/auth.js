import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const checkVerificationStatus = async (uid) => {
  try {
    const response = await axios.get(`${API_URL}/auth/check-verification/${uid}`);
    const { verified } = response.data;

    // Update local storage with new verification status
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      user.verified = verified;
      localStorage.setItem('user', JSON.stringify(user));
    }

    return verified;
  } catch (error) {
    console.error('Error checking verification status:', error);
    return false;
  }
};

export const resendVerificationEmail = async (uid) => {
  try {
    await axios.post(`${API_URL}/auth/resend-verification`, { uid });
    return true;
  } catch (error) {
    console.error('Error resending verification email:', error);
    throw error;
  }
}; 
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext'; // Ensure proper export of AuthContext
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext); // Using context to get user data
  const [kycStatus, setKycStatus] = useState(user?.kycStatus || false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect if user is not logged in
    }
  }, [user, navigate]);

  const handleKycUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/kyc/update', null, {
        withCredentials: true,
      });
      setUser({ ...user, kycStatus: true }); // Update user context
      setKycStatus(true);
      alert('KYC Updated successfully!');
    } catch (error) {
      alert('Failed to update KYC status!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Show loading indicator while user data is fetched
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Profile</h2>

      <div className="bg-white p-4 rounded-md shadow-lg">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Phone:</span>
            <span>{user.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">KYC Status:</span>
            <span className={kycStatus ? 'text-green-500' : 'text-red-500'}>
              {kycStatus ? 'Completed' : 'Pending'}
            </span>
          </div>

          {!kycStatus && (
            <div className="flex justify-center">
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
                onClick={handleKycUpdate}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Complete KYC'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

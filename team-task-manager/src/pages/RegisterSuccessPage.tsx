
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Registration Successful</h1>
        <p className="mb-6">Your account has been created. Please click OK to return to the homepage.</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => navigate('/')}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default RegisterSuccessPage;

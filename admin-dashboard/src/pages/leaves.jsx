import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Sample data
const initialRequests = [
  {
    employeeId: "W12345",
    leaveType: "Sick",
    startDate: "2024-08-15",
    endDate: "2024-08-20",
    reason: "Flu symptoms and required rest",
    status: "Pending",
    appliedOn: "2024-08-12T09:30:00Z"
  },
  {
    employeeId: "W67890",
    leaveType: "Casual",
    startDate: "2024-09-01",
    endDate: "2024-09-05",
    reason: "Personal vacation",
    status: "Pending",
    appliedOn: "2024-08-10T14:00:00Z"
  },
  {
    employeeId: "W54321",
    leaveType: "Earned",
    startDate: "2024-08-25",
    endDate: "2024-08-30",
    reason: "Family event",
    status: "Approved",
    appliedOn: "2024-08-01T11:15:00Z"
  },
  {
    employeeId: "W98765",
    leaveType: "Unpaid",
    startDate: "2024-09-10",
    endDate: "2024-09-20",
    reason: "Extended personal time off",
    status: "Rejected",
    appliedOn: "2024-08-05T08:45:00Z"
  },
  {
    employeeId: "W24680",
    leaveType: "Sick",
    startDate: "2024-08-22",
    endDate: "2024-08-24",
    reason: "Medical procedure recovery",
    status: "Pending",
    appliedOn: "2024-08-12T10:00:00Z"
  },
  {
    employeeId: "W13579",
    leaveType: "Earned",
    startDate: "2024-08-18",
    endDate: "2024-08-22",
    reason: "Traveling for a conference",
    status: "Approved",
    appliedOn: "2024-08-07T13:00:00Z"
  },
  {
    employeeId: "W86420",
    leaveType: "Casual",
    startDate: "2024-09-12",
    endDate: "2024-09-15",
    reason: "Attending a family reunion",
    status: "Pending",
    appliedOn: "2024-08-11T15:30:00Z"
  },
  {
    employeeId: "W35791",
    leaveType: "Unpaid",
    startDate: "2024-09-25",
    endDate: "2024-10-01",
    reason: "Personal development leave",
    status: "Pending",
    appliedOn: "2024-08-08T17:00:00Z"
  },
  {
    employeeId: "W48264",
    leaveType: "Sick",
    startDate: "2024-08-27",
    endDate: "2024-08-30",
    reason: "Undergoing medical tests",
    status: "Approved",
    appliedOn: "2024-08-10T10:20:00Z"
  }
];

const LeaveRequests = () => {
  // State for managing leave request statuses
  const [requests, setRequests] = useState(initialRequests);

  // Function to handle the approval action
  const handleApprove = (employeeId) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.employeeId === employeeId
          ? { ...request, status: 'Approved' }
          : request
      )
    );
    toast.success(`Leave for employee ${employeeId} has been approved.`);
  };

  // Function to handle the decline action
  const handleDecline = (employeeId) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.employeeId === employeeId
          ? { ...request, status: 'Rejected' }
          : request
      )
    );
    toast.error(`Leave for employee ${employeeId} has been declined.`);
  };

  return (
    <div className='h-full'>
      <ToastContainer
        position="bottom-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      /> 
      <div className='bg-black'>
      <p className="text-red-300 mt-2 text-3xl ml-72">
          Here are the different types of leave you might encounter:
        </p>
        <ul className="text-white mt-2 list-disc list-inside w-2/3  ml-60">
          <li><strong>Sick Leave:</strong> Used when an employee is ill or has health issues that prevent them from working. Typically requires a medical certificate.</li>
          <li><strong>Casual Leave:</strong> For personal reasons such as urgent matters or short-term needs. Often doesn't require detailed documentation and can be taken in small increments.</li>
          <li><strong>Earned Leave:</strong> Accumulated over time and used for vacations or personal relaxation. It is usually paid leave and might be carried over to the next year.</li>
          <li><strong>Unpaid Leave:</strong> Time off without pay, used when paid leave is exhausted or for special circumstances. Requires approval and does not accrue leave or benefits during the period.</li>
        </ul>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg mt-8 w-3/4 ml-36">
        <h3 className="text-4xl font-semibold">Leave Requests</h3>
        <p className="text-gray-400 mt-4">List of leave requests with details.</p>
        <table className="w-full mt-4 text-left">
          <thead>
            <tr>
              <th className="text-gray-400 py-2">Employee ID</th>
              <th className="text-gray-400 py-2">Leave Type</th>
              <th className="text-gray-400 py-2">Start Date</th>
              <th className="text-gray-400 py-2">End Date</th>
              <th className="text-gray-400 py-2">Reason</th>
              <th className="text-gray-400 py-2">Applied On</th>
              <th className="text-gray-400 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.employeeId}>
                <td className="py-2">{request.employeeId}</td>
                <td className="py-2">{request.leaveType}</td>
                <td className="py-2">{request.startDate}</td>
                <td className="py-2">{request.endDate}</td>
                <td className="py-2">{request.reason}</td>
                <td className="py-2">{new Date(request.appliedOn).toLocaleDateString()}</td>
                <td className="py-2 flex space-x-2">
                  {request.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(request.employeeId)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDecline(request.employeeId)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      >
                        Decline
                      </button>
                    </>
                  )}
                  {request.status === 'Approved' && (
                    <span className="text-green-500">Approved</span>
                  )}
                  {request.status === 'Rejected' && (
                    <span className="text-red-500">Rejected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequests;

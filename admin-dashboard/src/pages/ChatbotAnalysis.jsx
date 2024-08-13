import React, { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const mockChats = [
  { id: 1, user: 'User1', message: 'I feel overwhelmed.', timestamp: '2024-08-13 12:00' },
  { id: 2, user: 'User2', message: 'I’m doing okay.', timestamp: '2024-08-13 12:01' },
  { id: 3, user: 'User1', message: 'I’m feeling very stressed about work.', timestamp: '2024-08-13 12:02' },
  { id: 4, user: 'User3', message: 'Everything is fine.', timestamp: '2024-08-13 12:03' },
  { id: 5, user: 'User2', message: 'I’m quite overwhelmed by recent events.', timestamp: '2024-08-13 12:04' },
  // Add more mock data as needed
];

const PAGE_SIZE = 10;

// Define fixed colors for each emotion
const emotionColors = {
  Overwhelmed: 'rgba(255, 99, 132, 0.2)',
  Stressed: 'rgba(255, 159, 64, 0.2)',
  Okay: 'rgba(75, 192, 192, 0.2)',
};

const borderColors = {
  Overwhelmed: 'rgba(255, 99, 132, 1)',
  Stressed: 'rgba(255, 159, 64, 1)',
  Okay: 'rgba(75, 192, 192, 1)',
};

const ChatAnalysis = () => {
  const [chats, setChats] = useState(mockChats);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterUser, setFilterUser] = useState('');

  const filteredChats = chats
    .filter(chat => chat.message.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(chat => !filterUser || chat.user === filterUser);

  const paginatedChats = filteredChats.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleFilterUser = (e) => setFilterUser(e.target.value);

  const totalPages = Math.ceil(filteredChats.length / PAGE_SIZE);

  const emotionalStateCounts = filteredChats.reduce((acc, chat) => {
    const emotion = chat.message.toLowerCase().includes('overwhelmed') ? 'Overwhelmed' :
                    chat.message.toLowerCase().includes('stressed') ? 'Stressed' :
                    'Okay';
    acc[emotion] = (acc[emotion] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(emotionalStateCounts),
    datasets: [{
      label: 'Emotional States',
      data: Object.values(emotionalStateCounts),
      backgroundColor: Object.keys(emotionalStateCounts).map(emotion => emotionColors[emotion] || 'rgba(200, 200, 200, 0.2)'),
      borderColor: Object.keys(emotionalStateCounts).map(emotion => borderColors[emotion] || '#000'),
      borderWidth: 1,
    }],
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Chat Analysis</h1>
      <div className="mb-4 flex flex-col items-center space-y-4">
        <input
          type="text"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 rounded bg-gray-800 border border-gray-700 text-white w-full max-w-md"
        />
        <select
          value={filterUser}
          onChange={handleFilterUser}
          className="p-2 rounded bg-gray-800 border border-gray-700 text-white w-full max-w-md"
        >
          <option value="">All Users</option>
          {[...new Set(chats.map(chat => chat.user))].map(user => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </div>
    <div className='flex justify-center'>  <div className="mb-6 w-3/4 ">
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 border border-gray-700">
          <thead>
            <tr className="text-left">
              <th className="py-3 px-4 border-b border-gray-700">ID</th>
              <th className="py-3 px-4 border-b border-gray-700">User</th>
              <th className="py-3 px-4 border-b border-gray-700">Message</th>
              <th className="py-3 px-4 border-b border-gray-700">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {paginatedChats.map(chat => (
              <tr key={chat.id} className="border-b border-gray-700">
                <td className="py-3 px-4">{chat.id}</td>
                <td className="py-3 px-4">{chat.user}</td>
                <td className="py-3 px-4">{chat.message}</td>
                <td className="py-3 px-4">{chat.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded bg-gray-700 text-white"
        >
          Previous
        </button>
        <span className="text-white">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded bg-gray-700 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChatAnalysis;

import React from 'react';

const MainScreen = () => {
  return (
    <div className="bg-black min-h-screen text-white p-8">
      <div className="space-y-8">
        <div className="flex space-x-8">
          <div className="bg-gray-800 p-6 w-96 rounded-lg">
            <h2 className="text-4xl font-semibold">Warehouse Overview</h2>
            <p className="text-gray-400">Key metrics and statistics about the Employees </p>
            <div className="flex space-x-6 mt-4">
              <div>
                <h3 className="text-3xl font-bold">10</h3>
                <p className="text-gray-400">Total Employees</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">45%</h3>
                <p className="text-gray-400">Currently Present</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 w-96 rounded-lg">
            <h3 className="text-4xl font-semibold">Working Conditions</h3>
            <div className="flex space-x-6 mt-4">
              <div>
                <h3 className="text-3xl font-bold">32°C</h3>
                <p className="text-gray-400">Temperature</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">45%</h3>
                <p className="text-gray-400">Humidity</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 w-96 rounded-lg">
            <h3 className="text-4xl font-semibold"> First Aid Stock</h3>
            <p className="text-gray-400">Details about the current stock of first aid in the Warehouse </p>
            <div className="flex space-x-6 mt-4">
              <div>
                <h3 className="text-3xl font-bold">42</h3>
                <p className="text-gray-400">Bandages</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">10</h3>
                <p className="text-gray-400">Savlon</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">10</h3>
                <p className="text-gray-400">Bandit</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">10</h3>
                <p className="text-gray-400">Volini</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">1</h3>
                <p className="text-gray-400">Meethi Goli</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-4xl font-semibold">Recent Check In</h3>
          <p className="text-gray-400 mt-2">Check In's completed in the last 6 hours.</p>
          <table className="w-full mt-4 text-left">
            <thead>
              <tr>
                <th className="text-gray-400 py-2">Employee Id</th>
                <th className="text-gray-400 py-2">Employee Name</th>
                <th className="text-gray-400 py-2">Employee Email</th>
                <th className="text-gray-400 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">12345</td>
                <td className="py-2">John Doe</td>
                <td className="py-2">Johndoe@gmail.com</td>
                <td className="py-2">Checked-out</td>
              </tr>
              <tr>
                <td className="py-2">12346</td>
                <td className="py-2">Jane Smith</td>
                <td className="py-2">JaneSmith@gmail.com</td>
                <td className="py-2">Checked-in</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;

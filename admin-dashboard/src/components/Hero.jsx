import { useState, useEffect } from "react";
import axios from "axios";

const MainScreen = () => {
  const [workingConditions, setWorkingConditions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCondition, setNewCondition] = useState({
    date: "",
    temperature: "",
    humidity: "",
    noise: "",
    light: "",
    airQuality: "",
    amenities: "",
    breaks: "",
    otherConditions: ""
  });

  const [firstAidStock, setFirstAidStock] = useState([
    { name: 'Bandages', quantity: 50 },
    { name: 'Plasters', quantity: 20 },
    { name: 'Scissors', quantity: 5 },
    { name: 'Tweezers', quantity: 5 },
    { name: 'Gloves', quantity: 20 },
    { name: 'Antiseptic', quantity: 10 },
    { name: 'Cotton Wool', quantity: 10 },
    { name: 'Thermometer', quantity: 5 },
    { name: 'Painkillers', quantity: 10 },
    { name: 'Burn Cream', quantity: 10 },
  ]);

  const getWorkingConditions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/workingconditions/');
      setWorkingConditions(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const addWorkingCondition = async () => {
    try {
      const response = await axios.post('http://localhost:8080/workingconditions/', newCondition);
      console.log(response.data);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCondition({
      ...newCondition,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addWorkingCondition();
  };

  useEffect(() => {
    getWorkingConditions();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Warehouse Overview */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-4xl font-semibold">Warehouse Overview</h2>
          <p className="text-gray-400">Key metrics and statistics about the Employees</p>
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

        {/* Working Conditions */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-4xl font-semibold">Working Conditions</h3>
          <div className="grid grid-cols-2 space-y-4 mt-4">
            <div>
              <h3 className="text-3xl font-bold">{workingConditions.temperature}°C</h3>
              <p className="text-gray-400">Temperature</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">{workingConditions.humidity}%</h3>
              <p className="text-gray-400">Humidity</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">{workingConditions.noise} dB</h3>
              <p className="text-gray-400">Noise</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">{workingConditions.light} lux</h3>
              <p className="text-gray-400">Light</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">{workingConditions.airQuality}</h3>
              <p className="text-gray-400">Air Quality</p>
            </div>
          </div>
          <button
            onClick={toggleModal}
            className="mt-4 bg-gray-700 text-white py-2 px-4 rounded mr-4 hover:bg-gray-600 hover:text-white"
          >
            See more...
          </button>

          <button
            onClick={toggleAddModal}
            className="mt-6 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 hover:text-white"
          >
            Add New Working Condition
          </button>

        </div>

        {/* First Aid Stock */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-4xl font-semibold">First Aid Stock</h3>
          <p className="text-gray-400">Details about the current stock of first aid in the Warehouse</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {firstAidStock.map((item, index) => (
              <div key={index}>
                <h3 className="text-3xl font-bold">{item.quantity}</h3>
                <p className="text-gray-400">{item.name}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => alert('Update first aid stock functionality coming soon!')}
            className="mt-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 hover:text-white"
          >
            Update First Aid Stock
          </button>
        </div>
      </div>

      {/* Recent Check In */}
      <div className="bg-gray-800 p-6 rounded-lg mt-8">
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

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-lg w-1/2">
            <h3 className="text-3xl font-semibold mb-4">Add New Working Condition</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400">Date</label>
                  <input
                    type="datetime-local"
                    name="date"
                    value={newCondition.date}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-400">Temperature</label>
                  <input
                    type="number"
                    name="temperature"
                    value={newCondition.temperature}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-400">Humidity</label>
                  <input
                    type="number"
                    name="humidity"
                    value={newCondition.humidity}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-400">Noise</label>
                  <input
                    type="number"
                    name="noise"
                    value={newCondition.noise}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-400">Light</label>
                  <input
                    type="number"
                    name="light"
                    value={newCondition.light}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-400">Air Quality</label>
                  <input
                    type="text"
                    name="airQuality"
                    value={newCondition.airQuality}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-400">Amenities</label>
                  <input
                    type="text"
                    name="amenities"
                    value={newCondition.amenities}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-400">Breaks</label>
                  <input
                    type="text"
                    name="breaks"
                    value={newCondition.breaks}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-400">Other Conditions</label>
                  <input
                    type="text"
                    name="otherConditions"
                    value={newCondition.otherConditions}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white p-2 rounded"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={toggleAddModal}
                  className="bg-red-600 text-white py-2 px-4 rounded ml-4 hover:bg-red-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-lg w-1/2">
            <h3 className="text-3xl font-semibold mb-4">Working Conditions</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xl font-semibold">Temperature:</h4>
                <p>{workingConditions.temperature}°C</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold">Humidity:</h4>
                <p>{workingConditions.humidity}%</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold">Noise:</h4>
                <p>{workingConditions.noise} dB</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold">Light:</h4>
                <p>{workingConditions.light} lux</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold">Air Quality:</h4>
                <p>{workingConditions.airQuality}</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold">Amenities:</h4>
                <p>{workingConditions.amenities}</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold">Breaks:</h4>
                <p>{workingConditions.breaks}</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold">Other Conditions:</h4>
                <p>{workingConditions.otherConditions}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={toggleModal}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainScreen;

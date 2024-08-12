export const SafetyCheck = () => {
return (
    <div className="bg-black min-h-screen text-white p-8">
    <div className="grid grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-4xl font-semibold">Warehouse Overview</h2>
        <p className="text-gray-400">
            Key metrics and statistics about the Employees
        </p>
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

          {/* Average Hours Worked */}
        <div className="mt-6">
            <h3 className="text-3xl font-bold">Average Hours Worked</h3>
            <p className="text-gray-400">Average hours worked per week</p>
            <div className="mt-2">
                <h3 className="text-3xl font-bold">38</h3>
                <p className="text-gray-400">Hours</p>
            </div>
        </div>

          {/* Upcoming Shifts */}
        <div className="mt-6">
            <h3 className="text-3xl font-bold">Upcoming Shifts</h3>
            <p className="text-gray-400">Next 3 upcoming shifts</p>
            <div className="mt-2">
            <ul className="list-disc list-inside text-gray-400">
                <li>Shift 1: August 13, 2024 - 9 AM to 5 PM</li>
                <li>Shift 2: August 14, 2024 - 1 PM to 9 PM</li>
                <li>Shift 3: August 15, 2024 - 10 AM to 6 PM</li>
            </ul>
            </div>
        </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-4xl font-semibold">Warehouse Overview</h2>
            <p className="text-gray-400">
            Key metrics and statistics about the Employees
            </p>
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

          {/* Average Hours Worked */}
        <div className="mt-6">
            <h3 className="text-3xl font-bold">Average Hours Worked</h3>
            <p className="text-gray-400">Average hours worked per week</p>
            <div className="mt-2">
                <h3 className="text-3xl font-bold">38</h3>
                <p className="text-gray-400">Hours</p>
            </div>
        </div>

          {/* Upcoming Shifts */}
        <div className="mt-6">
            <h3 className="text-3xl font-bold">Upcoming Shifts</h3>
            <p className="text-gray-400">Next 3 upcoming shifts</p>
            <div className="mt-2">
            <ul className="list-disc list-inside text-gray-400">
                <li>Shift 1: August 13, 2024 - 9 AM to 5 PM</li>
                <li>Shift 2: August 14, 2024 - 1 PM to 9 PM</li>
                <li>Shift 3: August 15, 2024 - 10 AM to 6 PM</li>
            </ul>
            </div>
        </div>
        </div>
    </div>
    </div>
    );
};

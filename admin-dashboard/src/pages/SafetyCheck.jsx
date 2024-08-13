import { useState } from 'react';

export const SafetyCheck = () => {
  
    const [audits, setAudits] = useState([
        { id: 1, date: 'August 10, 2024', auditor: 'John Doe', findings: '', recommendations: '' },
        { id: 2, date: 'July 25, 2024', auditor: 'Jane Smith', findings: '', recommendations: '' },
        { id: 3, date: 'June 30, 2024', auditor: 'Alice Johnson', findings: '', recommendations: '' },
    ]);

   
    const [incidents, setIncidents] = useState([
        { id: 1, date: 'August 5, 2024', description: 'Slip and fall in warehouse', usersInvolved: ['John Doe'] },
        { id: 2, date: 'July 15, 2024', description: 'Fire in storage room', usersInvolved: ['Jane Smith', 'Alice Johnson'] },
    ]);

  
    const [newAudit, setNewAudit] = useState({
        date: '',
        auditor: '',
        findings: '',
        recommendations: '',
    });


    const [newIncident, setNewIncident] = useState({
        date: '',
        description: '',
        usersInvolved: '',
    });

    
    const handleAuditInputChange = (e) => {
        const { name, value } = e.target;
        setNewAudit({ ...newAudit, [name]: value });
    };

    
    const handleIncidentInputChange = (e) => {
        const { name, value } = e.target;
        setNewIncident({ ...newIncident, [name]: value });
    };

    
    const handleUpdateAudit = () => {
        if (newAudit.date && newAudit.auditor) {
            const updatedAudits = [
                ...audits,
                { 
                    id: audits.length + 1, 
                    date: newAudit.date, 
                    auditor: newAudit.auditor,
                    findings: newAudit.findings,
                    recommendations: newAudit.recommendations,
                }
            ];
            setAudits(updatedAudits);
            
            setNewAudit({
                date: '',
                auditor: '',
                findings: '',
                recommendations: '',
            });
        }
    };


    const handleUpdateIncident = () => {
        if (newIncident.date && newIncident.description && newIncident.usersInvolved) {
            const updatedIncidents = [
                ...incidents,
                {
                    id: incidents.length + 1,
                    date: newIncident.date,
                    description: newIncident.description,
                    usersInvolved: newIncident.usersInvolved.split(',').map(user => user.trim()),
                }
            ];
            setIncidents(updatedIncidents);
            
            setNewIncident({
                date: '',
                description: '',
                usersInvolved: '',
            });
        }
    };

    return (
        <div className="bg-black min-h-screen text-white p-8">
            <div className="grid grid-cols-2 gap-8">
                
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-4xl font-semibold">Safety Audit Management</h2>
                    <p className="text-gray-400">Manage and update safety audits regularly</p>

                    
                    <div className="mt-6">
                        <h3 className="text-3xl font-bold">Recent Audits</h3>
                        <p className="text-gray-400">List of recent safety audits</p>
                        <div className="mt-2">
                            <ul className="list-disc list-inside text-gray-400">
                                {audits.map(audit => (
                                    <li key={audit.id}>
                                        Audit {audit.id}: {audit.date} - Auditor: {audit.auditor}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    
                    <div className="mt-6">
                        <h3 className="text-3xl font-bold">Update Audit</h3>
                        <div className="mt-4 space-y-4">
                           
                            <div>
                                <label className="block text-gray-400">Audit Date</label>
                                <input 
                                    type="date" 
                                    name="date"
                                    value={newAudit.date}
                                    onChange={handleAuditInputChange}
                                    className="bg-gray-700 p-2 rounded-lg w-full text-white" 
                                />
                            </div>
                           
                            <div>
                                <label className="block text-gray-400">Auditor Name</label>
                                <input 
                                    type="text" 
                                    name="auditor"
                                    value={newAudit.auditor}
                                    onChange={handleAuditInputChange}
                                    className="bg-gray-700 p-2 rounded-lg w-full text-white" 
                                    placeholder="Enter auditor name" 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-400">Findings</label>
                                <textarea 
                                    name="findings"
                                    value={newAudit.findings}
                                    onChange={handleAuditInputChange}
                                    className="bg-gray-700 p-2 rounded-lg w-full text-white" 
                                    rows="3" 
                                    placeholder="Enter findings"
                                ></textarea>
                            </div>
                            
                            <div>
                                <label className="block text-gray-400">Recommendations</label>
                                <textarea 
                                    name="recommendations"
                                    value={newAudit.recommendations}
                                    onChange={handleAuditInputChange}
                                    className="bg-gray-700 p-2 rounded-lg w-full text-white" 
                                    rows="3" 
                                    placeholder="Enter recommendations"
                                ></textarea>
                            </div>
                            
                            <div className='flex justify-center'>
                                <button 
                                    className="bg-blue w-44 p-2 rounded-lg  text-white font-semibold"
                                    onClick={handleUpdateAudit}
                                >
                                    Update Audit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

               
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-4xl font-semibold">Safety Incident Management</h2>
                    <p className="text-gray-400">Manage and report safety incidents</p>

                    
                    <div className="mt-6">
                        <h3 className="text-3xl font-bold">Recent Incidents</h3>
                        <p className="text-gray-400">List of recent safety incidents</p>
                        <div className="mt-2">
                            <ul className="list-disc list-inside text-gray-400">
                                {incidents.map(incident => (
                                    <li key={incident.id}>
                                        Incident {incident.id}: {incident.date} - {incident.description} (Involved: {incident.usersInvolved.join(', ')})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                   
                    <div className="mt-6">
                        <h3 className="text-3xl font-bold">Report Incident</h3>
                        <div className="mt-4 space-y-4">
                            
                            <div>
                                <label className="block text-gray-400">Incident Date</label>
                                <input 
                                    type="date" 
                                    name="date"
                                    value={newIncident.date}
                                    onChange={handleIncidentInputChange}
                                    className="bg-gray-700 p-2 rounded-lg w-full text-white" 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-gray-400">Description</label>
                                <textarea 
                                    name="description"
                                    value={newIncident.description}
                                    onChange={handleIncidentInputChange}
                                    className="bg-gray-700 p-2 rounded-lg w-full text-white" 
                                    rows="3" 
                                    placeholder="Describe the incident"
                                ></textarea>
                            </div>
                            
                            <div>
                                <label className="block text-gray-400">Users Involved</label>
                                <input 
                                    type="text" 
                                    name="usersInvolved"
                                    value={newIncident.usersInvolved}
                                    onChange={handleIncidentInputChange}
                                    className="bg-gray-700 p-2 rounded-lg w-full text-white" 
                                    placeholder="Enter names, separated by commas" 
                                />
                            </div>
                            
                            <div className='flex justify-center'>
                                <button 
                                    className="bg-blue w-44 p-2 rounded-lg text-white font-semibold"
                                    onClick={handleUpdateIncident}
                                >
                                    Report Incident
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

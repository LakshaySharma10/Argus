import React, { useState, useEffect } from 'react';

export const SafetyCheck = () => {
    const [audits, setAudits] = useState([]);
    const [incidents, setIncidents] = useState([]);
    const [selectedAudit, setSelectedAudit] = useState(null);
    const [selectedIncident, setSelectedIncident] = useState(null);

    const [newAudit, setNewAudit] = useState({
        auditDate: '',
        auditor: '',
        findings: '',
        recommendations: '',
    });

    const [newIncident, setNewIncident] = useState({
        date: '',
        description: '',
        usersInvolved: '',
    });

    useEffect(() => {
        fetch('http://localhost:8080/audit/audits')
            .then((response) => response.json())
            .then((data) => {
                setAudits(data.map((audit) => ({
                    id: audit._id,
                    auditDate: new Date(audit.auditDate).toLocaleDateString(),
                    auditor: audit.auditor,
                    findings: audit.findings,
                    recommendations: audit.recommendations,
                })));
            })
            .catch((error) => {
                console.error('Error fetching audits:', error);
            });

        fetch('http://localhost:8080/safetyincidents/incidents')
            .then((response) => response.json())
            .then((data) => {
                setIncidents(data.map((incident) => ({
                    id: incident._id,
                    date: new Date(incident.incidentDate).toLocaleDateString(),
                    description: incident.description,
                    usersInvolved: incident.usersInvolved,
                })));
            })
            .catch((error) => {
                console.error('Error fetching incidents:', error);
            });
    }, []);

    const handleAuditInputChange = (e) => {
        const { name, value } = e.target;
        setNewAudit({ ...newAudit, [name]: value });
    };

    const handleIncidentInputChange = (e) => {
        const { name, value } = e.target;
        setNewIncident({ ...newIncident, [name]: value });
    };

    const handleUpdateAudit = () => {
        if (newAudit.auditDate && newAudit.auditor) {
            const newAuditData = {
                auditDate: new Date(newAudit.auditDate).toISOString(),
                auditor: newAudit.auditor,
                findings: newAudit.findings.split(';').map((finding) => ({
                    item: finding.split(':')[0].trim(),
                    status: finding.split(':')[1].trim(),
                    notes: finding.split(':')[2].trim(),
                })),
                recommendations: newAudit.recommendations.split(';').map((rec) => rec.trim()),
            };

            fetch('http://localhost:8080/audit/audit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAuditData),
            })
            .then((response) => response.json())
            .then((data) => {
                setAudits([...audits, { ...newAuditData, id: data._id }]);
                setNewAudit({
                    auditDate: '',
                    auditor: '',
                    findings: '',
                    recommendations: '',
                });
            })
            .catch((error) => {
                console.error('Error reporting audit:', error);
            });
        }
    };

    const handleUpdateIncident = () => {
        if (newIncident.date && newIncident.description && newIncident.usersInvolved) {
            const newIncidentData = {
                incidentDate: new Date(newIncident.date).toISOString(),
                description: newIncident.description,
                usersInvolved: newIncident.usersInvolved.split(',').map((user) => user.trim()),
            };

            fetch('http://localhost:8080/safetyincidents/incident', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newIncidentData),
            })
            .then((response) => response.json())
            .then((data) => {
                setIncidents([...incidents, { ...newIncidentData, id: data.id }]);
                setNewIncident({
                    date: '',
                    description: '',
                    usersInvolved: '',
                });
            })
            .catch((error) => {
                console.error('Error reporting incident:', error);
            });
        }
    };

    const openAuditModal = (audit) => setSelectedAudit(audit);
    const closeAuditModal = () => setSelectedAudit(null);

    const openIncidentModal = (incident) => setSelectedIncident(incident);
    const closeIncidentModal = () => setSelectedIncident(null);

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
                                {audits.map((audit) => (
                                    <li key={audit.id}>
                                        Audit {audit.id}: {audit.auditDate} - Auditor: {audit.auditor}
                                        <button
                                            className="ml-4 text-blue-400"
                                            onClick={() => openAuditModal(audit)}
                                        >
                                            View Details
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-3xl font-bold">New Audit</h3>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="block text-gray-400">Audit Date</label>
                                <input
                                    type="date"
                                    name="auditDate"
                                    value={newAudit.auditDate}
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
                                    placeholder="Enter findings (format: item:status:notes; separate multiple findings with semicolons)"
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
                                    placeholder="Enter recommendations (separate with semicolons)"
                                ></textarea>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className="bg-green-600 w-44 p-2 rounded-lg text-white font-semibold"
                                    onClick={handleUpdateAudit}
                                >
                                    New Audit
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
                                {incidents.map((incident) => (
                                    <li key={incident.id}>
                                        Incident {incident.id}: {incident.date}
                                        <button
                                            className="ml-4 text-blue-400"
                                            onClick={() => openIncidentModal(incident)}
                                        >
                                            View Details
                                        </button>
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
                                    placeholder="Enter incident description"
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
                                    placeholder="Enter names of users involved (separate with commas)"
                                />
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className="bg-red-600 w-44 p-2 rounded-lg text-white font-semibold"
                                    onClick={handleUpdateIncident}
                                >
                                    Report Incident
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedAudit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg w-1/2">
                        <h2 className="text-3xl font-semibold">Audit Details</h2>
                        <p><strong>Date:</strong> {selectedAudit.auditDate}</p>
                        <p><strong>Auditor:</strong> {selectedAudit.auditor}</p>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold">Findings</h3>
                            <ul className="list-disc list-inside text-gray-400">
                                {selectedAudit.findings.map((finding, index) => (
                                    <li key={index}>
                                        Item: {finding.item} - Status: {finding.status} - Notes: {finding.notes}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold">Recommendations</h3>
                            <ul className="list-disc list-inside text-gray-400">
                                {selectedAudit.recommendations.map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            className="mt-6 bg-red-600 p-2 rounded-lg text-white"
                            onClick={closeAuditModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {selectedIncident && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg w-1/2">
                        <h2 className="text-3xl font-semibold">Incident Details</h2>
                        <p><strong>Date:</strong> {selectedIncident.date}</p>
                        <p><strong>Description:</strong> {selectedIncident.description}</p>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold">Users Involved</h3>
                            <ul className="list-disc list-inside text-gray-400">
                                {selectedIncident.usersInvolved.map((user, index) => (
                                    <li key={index}>{user}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            className="mt-6 bg-red-600 p-2 rounded-lg text-white"
                            onClick={closeIncidentModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SafetyCheck;

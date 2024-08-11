import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import logo from '../../assets/images/argusLogo.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SafetyIncidents = () => {
    const [user, setUser] = useState({
        _id: '',
        username: '',
        email: '',
    });

    const [incidents, setIncidents] = useState([]);

    const getJWT = async () => {
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            return token;
        } catch (error) {
            console.error('Error retrieving JWT', error);
        }
    };

    const getUser = async () => {
        try {
            const token = await getJWT();
            const response = await axios.get("http://localhost:8080/auth/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data);
        } catch (error) {
            console.log("Failed to retrieve user:", error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const getIncidents = async () => {
        try {
            const token = await getJWT();
            const response = await axios.get(`http://localhost:8080/safetyincidents/incidents`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setIncidents(response.data);
        } catch (error) {
            console.error('Error retrieving incidents', error);
        }
    };

    useEffect(() => {
        if (user._id) {
            getIncidents();
        }
    }, [user]);

    const profilePictureUri = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyNjYzN3wwfDF8c2VhcmNofDJ8fHByb2ZpbGV8ZW58MHx8fHwxNjk3NjIxOTkyfDA&ixlib=rb-4.0.3&q=80&w=400';

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <Image source={{ uri: profilePictureUri }} style={styles.profilePicture} />
            </View>
            <Text style={styles.title}>Safety Incidents</Text>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Date</Text>
                    <Text style={styles.tableHeaderText}>Description</Text>
                    <Text style={styles.tableHeaderText}>Involved Users</Text>
                </View>

                {incidents.map((incident, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableRowText}>
                            {new Date(incident.incidentDate).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}
                        </Text>
                        <Text style={styles.tableRowText}>{incident.description}</Text>
                        <Text style={styles.tableRowText}>
                            {incident.usersInvolved.join(', ')}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    table: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: 400,
        marginTop: 35,
        alignSelf: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#555',
    },
    tableHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFABAB',
        width: '33%',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    tableRowText: {
        fontSize: 16,
        color: '#fff',
        width: '33%',
    },
    container: {
        flex: 1,
        backgroundColor: '#111',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 50,
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default SafetyIncidents;

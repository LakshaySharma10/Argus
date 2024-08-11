import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import logo from '../../assets/images/argusLogo.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SafetyAudits = () => {
    const [user, setUser] = useState({
        _id: '',
        username: '',
        email: '',
    });

    const [audits, setAudits] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState([]);  // Initialize as an empty array
    const [modalTitle, setModalTitle] = useState('');

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

    const getSafetyAudits = async () => {
        try {
            const token = await getJWT();
            const response = await axios.get("http://localhost:8080/audit/audits", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAudits(response.data);
            console.log('Safety audits retrieved:', response.data);
        } catch (error) {
            console.error('Error retrieving safety audits', error);
        }
    };

    useEffect(() => {
        if (user._id) {
            getSafetyAudits();
        }
    }, [user]);

    const profilePictureUri = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyNjYzN3wwfDF8c2VhcmNofDJ8fHByb2ZpbGV8ZW58MHx8fHwxNjk3NjIxOTkyfDA&ixlib=rb-4.0.3&q=80&w=400';

    const handleModalOpen = (title, content) => {
        setModalTitle(title);
        if (title === 'Findings') {
            setModalContent(content.map(f => ({
                item: f.item,
                status: f.status,
                notes: f.notes,
            })));
        } else {
            setModalContent(content);
        }
        setModalVisible(true);
    };
    

    const renderModalContent = () => (
        <ScrollView style={styles.modalContent}>
            {Array.isArray(modalContent) ? (
                modalContent.map((item, index) => (
                    <View key={index} style={styles.modalItem}>
                        {modalTitle === 'Findings' ? (
                            <>
                                <Text style={styles.modalText}><Text style={styles.boldText}>Item:</Text> {item.item}</Text>
                                <Text style={styles.modalText}><Text style={styles.boldText}>Status:</Text> {item.status}</Text>
                                <Text style={styles.modalText}><Text style={styles.boldText}>Notes:</Text> {item.notes}</Text>
                            </>
                        ) : (
                            <Text style={styles.modalText}>{item}</Text>
                        )}
                    </View>
                ))
            ) : (
                <Text style={styles.modalText}>No data available</Text>
            )}
        </ScrollView>
    );
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <Image source={{ uri: profilePictureUri }} style={styles.profilePicture} />
            </View>
            <Text style={styles.title}>Safety Audits</Text>
            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Date</Text>
                    <Text style={styles.tableHeaderText}>Auditor</Text>
                    <Text style={styles.tableHeaderText}>Findings</Text>
                    <Text style={styles.tableHeaderText}>Recommendations</Text>
                </View>

                {audits.map((audit) => (
                    <View key={audit._id} style={styles.tableRow}>
                        <Text style={styles.tableRowText}>
                            {new Date(audit.auditDate).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}
                        </Text>
                        <Text style={[styles.tableRowText, styles.statusText]}>{audit.auditor}</Text>
                        <TouchableOpacity
                            style={[styles.tableRowText, styles.statusText]}
                            onPress={() => handleModalOpen('Findings', audit.findings.map(f => ({ item: f.item, status: f.status, notes: f.notes })))}
                        >
                            <Text style={styles.linkText}>View Findings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tableRowText, styles.statusText]}
                            onPress={() => handleModalOpen('Recommendations', audit.recommendations)}
                        >
                            <Text style={styles.linkText}>View Recommendations</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{modalTitle}</Text>
                    {renderModalContent()}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
        width: '25%',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    tableRowText: {
        fontSize: 16,
        color: '#fff',
        width: '20%',
    },
    statusText: {
        textAlign: 'center',
        width: '25%',
    },
    linkText: {
        color: '#FFABAB',
        textDecorationLine: 'underline',
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
    modalView: {
        margin: 20,
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFABAB',
        marginBottom: 15,
    },
    modalContent: {
        marginBottom: 20,
        maxHeight: 300,
    },
    modalItem: {
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#FFABAB',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default SafetyAudits;

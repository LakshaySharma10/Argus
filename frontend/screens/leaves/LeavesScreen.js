import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Button, Picker } from 'react-native';
import logo from '../../assets/images/argusLogo.png';

const LeavesScreen = () => {
  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [appliedDate, setAppliedDate] = useState(new Date());
  const [status, setStatus] = useState('Pending');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [dateType, setDateType] = useState('');

  const profilePictureUri = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyNjYzN3wwfDF8c2VhcmNofDJ8fHByb2ZpbGV8ZW58MHx8fHwxNjk3NjIxOTkyfDA&ixlib=rb-4.0.3&q=80&w=400';

  const showDatePicker = (type) => {
    setDateType(type);
    setCurrentDate(type === 'start' ? startDate : endDate);
    setDateModalVisible(true);
  };

  const handleConfirm = () => {
    if (dateType === 'start') {
      setStartDate(currentDate);
      if (endDate <= currentDate) {
        const newEndDate = new Date(currentDate);
        newEndDate.setDate(newEndDate.getDate() + 1);
        setEndDate(newEndDate);
      }
    } else if (dateType === 'end') {
      setEndDate(currentDate);
    }
    setDateModalVisible(false);
  };

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <Image source={{ uri: profilePictureUri }} style={styles.profilePicture} />
      </View>

      <Text style={styles.title}>Leaves</Text>

      <Text style={styles.subheader}>Employee Id</Text>
      <TextInput
        style={styles.input}
        placeholder="Employee Id"
        value="13422"
        editable={false}
      />

      <Text style={styles.subheader}>Leave Type</Text>
      <Picker
        selectedValue={leaveType}
        style={styles.input}
        onValueChange={(itemValue) => setLeaveType(itemValue)}
      >
        <Picker.Item label="Select type of Leave" value="" />
        <Picker.Item label="Sick Leave" value="sick" />
        <Picker.Item label="Casual Leave" value="casual" />
        <Picker.Item label="Earned Leave" value="earned" />
        <Picker.Item label="Unpaid Leave" value="unpaid" />
      </Picker>

      <View style={styles.row}>
        <View style={styles.halfInputContainer}>
          <Text style={styles.subheader}>Start Date</Text>
          <TouchableOpacity onPress={() => showDatePicker('start')} style={styles.input}>
            <Text style={{ color: '#fff' }}>{startDate.toDateString()}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.halfInputContainer}>
          <Text style={styles.subheader}>End Date</Text>
          <TouchableOpacity onPress={() => showDatePicker('end')} style={styles.input}>
            <Text style={{ color: '#fff' }}>{endDate.toDateString()}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subheader}>Leave Status</Text>
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={status}
        editable={false}
      />

      <Text style={styles.subheader}>Reason</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Provide a Reason for your leave"
        value={reason}
        onChangeText={(text) => setReason(text)}
        multiline={true}
        numberOfLines={4}
      />

      <Text style={styles.subheader}>Applied on</Text>
      <TouchableOpacity onPress={() => showDatePicker('applied')} style={styles.input}>
        <Text style={{ color: '#fff' }}>{appliedDate.toDateString()}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>

      <Modal
        visible={dateModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Date</Text>
            <View style={styles.dateSelector}>
              <Button title="Previous" onPress={() => changeDate(-1)} />
              <Text style={styles.selectedDate}>{currentDate.toDateString()}</Text>
              <Button title="Next" onPress={() => changeDate(1)} />
            </View>
            <View style={styles.modalButtons}>
              <Button title="Confirm" onPress={handleConfirm} color="#FF6665" />
              <Button title="Cancel" onPress={() => setDateModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6665',
    marginBottom: 10,
    textAlign: 'left',
  },
  input: {
    backgroundColor: '#444',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: 'center',
  },
  textArea: {
    backgroundColor: '#444',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    width: '48%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 320,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  selectedDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  applyButton: {
    backgroundColor: '#FF6665',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: 100,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LeavesScreen;

import React, { useState, useRef } from 'react';
import axios from 'axios';
import QrcodeDecoder from 'qrcode-decoder';

const CheckInOut = () => {
  const [scannedData, setScannedData] = useState(null);
  const [message, setMessage] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef(null);
  const qr = new QrcodeDecoder();

  const startCamera = () => {
    setCameraActive(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          qr.decodeFromCamera(videoRef.current).then((decodedData) => {
            handleScan(decodedData.data);
          }).catch((err) => {
            console.error('Error decoding QR code:', err);
            setMessage('Failed to decode QR code');
          });
        }
      }).catch((err) => {
        console.error('Error accessing camera:', err);
        setMessage('Failed to access camera');
      });
    }
  };

  const handleScan = async (data) => {
    if (data) {
      try {
        setScannedData(data);
        const response = await axios.post('http://localhost:8080/qr/verify', { decodedToken: data });
        setMessage(response.data.message);
        stopCamera(); // Stop the camera after successful scan
      } catch (error) {
        console.error('Error verifying QR code:', error);
        setMessage('Failed to verify QR code');
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setCameraActive(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageData = reader.result;
        try {
          const decodedData = await qr.decodeFromImage(imageData);
          setScannedData(decodedData.data);
          const response = await axios.post('http://localhost:8080/qr/verify', { decodedToken: decodedData.data });
          setMessage(response.data.message);
        } catch (error) {
          console.error('Error verifying QR code:', error);
          setMessage('Failed to verify QR code');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen min-w-screen">
      <h2 className="text-2xl font-semibold mb-4">Admin Check-In/Out</h2>
      <div className="mb-5 w-72 h-72 relative">
        {cameraActive && (
          <video ref={videoRef} className="w-full h-full" />
        )}
      </div>
      <button onClick={startCamera} className="mb-4 bg-gray-600 text-white py-2 px-4 rounded">
        {cameraActive ? 'Scanning...' : 'Start Camera'}
      </button>
      <input type="file" accept="image/*" onChange={handleFileUpload} className="mb-4" />
      <p className="text-center">{message}</p>
      <div className='w-full pr-12 pl-8'>
        <div className="bg-gray-800 p-6 rounded-lg mt-8 w-full">
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
              <tr>
                <td className="py-2">12347</td>
                <td className="py-2">Alice Johnson</td>
                <td className="py-2">AliceJohnson@gmail.com</td>
                <td className="py-2">Checked-in</td>
              </tr>
              <tr>
                <td className="py-2">12348</td>
                <td className="py-2">Bob Brown</td>
                <td className="py-2">BobBrown@gmail.com</td>
                <td className="py-2">Checked-out</td>
              </tr>
              <tr>
                <td className="py-2">12349</td>
                <td className="py-2">Charlie Davis</td>
                <td className="py-2">CharlieDavis@gmail.com</td>
                <td className="py-2">Checked-in</td>
              </tr>
              <tr>
                <td className="py-2">12350</td>
                <td className="py-2">Diana Evans</td>
                <td className="py-2">DianaEvans@gmail.com</td>
                <td className="py-2">Checked-out</td>
              </tr>
              <tr>
                <td className="py-2">12351</td>
                <td className="py-2">Ethan Foster</td>
                <td className="py-2">EthanFoster@gmail.com</td>
                <td className="py-2">Checked-in</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CheckInOut;

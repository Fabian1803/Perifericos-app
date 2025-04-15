import React, { useRef, useState } from 'react';

const CameraAccess: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraStatus, setCameraStatus] = useState('Cámara esperando acción...');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  // Iniciar cámara
  const startCamera = async () => {
    try {
      console.log('Solicitando acceso a la cámara...');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Camera MediaStream recibido:', mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setCameraStream(mediaStream);
      setCameraStatus('Cámara activada');
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      setCameraStatus('Error al acceder a la cámara');
    }
  };

  // Detener cámara
  const stopCamera = () => {
    if (cameraStream) {
      console.log('Deteniendo cámara...');
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      setCameraStatus('Cámara desactivada');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Cámara</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        className="border-2 border-gray-500 w-full max-w-md mb-2"
      ></video>
      <p className="text-blue-500">{cameraStatus}</p>
      <div className="flex gap-4 mt-2">
        <button
          onClick={startCamera}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Activar Cámara
        </button>
        <button
          onClick={stopCamera}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Desactivar Cámara
        </button>
      </div>
    </div>
  );
};

export default CameraAccess;
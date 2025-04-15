import React, { useState, useRef } from 'react';

function CameraAccess() {
  const [cameraOn, setCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const handleCameraToggle = async () => {
    if (!cameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
        setCameraOn(true);
        console.log('📷 Cámara activada');
      } catch (error) {
        console.error('🚫 Error al acceder a la cámara:', error);
      }
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        console.log('🔌 Cámara desactivada');
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setCameraOn(false);
    }
  };

  return (
    <div>
      <h2>Acceso a la Cámara</h2>
      <video
        ref={videoRef}
        autoPlay
        style={{ width: '300px', height: 'auto', border: '2px solid #ccc', marginBottom: '1rem' }}
      />
      <br />
      <button onClick={handleCameraToggle}>
        {cameraOn ? 'Desactivar Cámara' : 'Activar Cámara'}
      </button>
    </div>
  );
}

export default CameraAccess;

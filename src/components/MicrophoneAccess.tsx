import React, { useState, useRef } from 'react';

function MicrophoneAccess() {
  const [listening, setListening] = useState(false);
  const streamRef = useRef<MediaStream | null>(null); // ← Aquí le damos tipo

  const handleMicToggle = async () => {
    if (!listening) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        setListening(true);
        console.log('🎤 Micrófono activado');
      } catch (error) {
        console.error('🚫 Error al acceder al micrófono:', error);
      }
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop()); // ← Ya no hay error
        streamRef.current = null;
        console.log('🔇 Micrófono desactivado');
      }
      setListening(false);
    }
  };

  return (
    <div>
      <h2>Acceso al Micrófono</h2>
      <button onClick={handleMicToggle}>
        {listening ? 'Desactivar Micrófono' : 'Activar Micrófono'}
      </button>
    </div>
  );
}

export default MicrophoneAccess;

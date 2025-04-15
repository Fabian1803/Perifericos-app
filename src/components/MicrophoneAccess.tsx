import React, { useState } from 'react';

const MicrophoneAccess: React.FC = () => {
  const [micStatus, setMicStatus] = useState('Micrófono esperando acción...');
  const [transcription, setTranscription] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const startMic = () => {
    try {
      const SpeechRecognition =
        window.SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setMicStatus('Tu navegador no soporta la API de reconocimiento de voz.');
        throw new Error('SpeechRecognition no está disponible en este navegador.');
      }

      const micRecognition = new SpeechRecognition();
      micRecognition.lang = 'es-ES'; // Configura el idioma a español
      micRecognition.continuous = true; // Escucha de forma continua
      micRecognition.interimResults = true; // Muestra resultados parciales

      micRecognition.onstart = () => {
        setMicStatus('Micrófono activado y escuchando...');
      };

      micRecognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('');
        setTranscription(transcript); // Actualiza el contenido del textarea
      };

      micRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Error en el reconocimiento de voz:', event.error);

        switch (event.error) {
          case 'network':
            setMicStatus('Error de red: verifica tu conexión.');
            break;
          case 'not-allowed':
            setMicStatus('Permisos denegados. Activa el micrófono en la configuración.');
            break;
          case 'no-speech':
            setMicStatus('No se detectó habla. Intenta hablar más fuerte.');
            break;
          case 'aborted':
            setMicStatus('Reconocimiento abortado. Reiniciando...');
            micRecognition.start(); // Reinicia automáticamente si es abortado
            break;
          default:
            setMicStatus(`Error desconocido: ${event.error}`);
        }
      };

      micRecognition.onend = () => {
        setMicStatus('Micrófono desactivado.');
        setRecognition(null);
      };

      micRecognition.start();
      setRecognition(micRecognition);
    } catch (error) {
      console.error('Error al iniciar el micrófono:', error);
      setMicStatus('Error inesperado al iniciar el micrófono.');
    }
  };

  const stopMic = () => {
    if (recognition) {
      recognition.stop(); // Detiene el reconocimiento
      setRecognition(null);
      setMicStatus('Micrófono desactivado.');
    }
  };

  return (
    <div>
      <h2>Micrófono</h2>
      <p>{micStatus}</p>
      <textarea
        value={transcription}
        readOnly
        style={{ width: '100%', height: '100px', marginTop: '10px' }}
      />
      <div>
        <button onClick={startMic} style={{ marginRight: '10px' }}>Activar Micrófono</button>
        <button onClick={stopMic}>Desactivar Micrófono</button>
      </div>
    </div>
  );
};

export default MicrophoneAccess;
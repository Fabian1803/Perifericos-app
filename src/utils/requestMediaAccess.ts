export const requestMediaAccess = async () => {
    try {
      console.log('Solicitando acceso a cámara y micrófono...');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log('Acceso concedido. MediaStream:', mediaStream);
  
      return mediaStream;
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        console.error('Permisos denegados para el acceso a medios. Asegúrate de otorgar permisos.');
      } else if (error.name === 'NotFoundError') {
        console.error('No se encontró una cámara o micrófono en este dispositivo.');
      } else if (error.name === 'OverconstrainedError') {
        console.error('Restricciones no cumplidas. Intenta ajustar las configuraciones.');
      } else {
        console.error('Error desconocido al acceder a medios:', error);
      }
      throw error;
    }
  };
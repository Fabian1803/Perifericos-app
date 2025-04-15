import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  exampleFunction: () => {
    console.log('Esta es una función expuesta desde preload.js');
  },
});
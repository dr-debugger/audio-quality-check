import { useEffect, useState } from "react";

const useDeviceOptions = () => {
  const [audioInputs, setAudioInputs] = useState(null);
  const setDevices = (devices) => {
    console.log(devices);
  };
  useEffect(() => {
    const getDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setDevices(devices);
    };
    getDevices();
  }, []);

  return audioInputs;
};

export default useDeviceOptions;

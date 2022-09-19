import { useEffect, useState } from "react";

const useDeviceOptions = (stream) => {
  const [audioInputs, setAudioInputs] = useState([]);
  const setDevices = (devices) => {
    let arr = [];
    for (let i = 0; i < devices.length; i++) {
      if (devices[i].kind === "audioinput" && devices[i].deviceId !== "") {
        let obj = {
          label: devices[i].label,
          id: devices[i].deviceId,
        };
        arr.push(obj);
      }
    }

    setAudioInputs(arr);
  };
  useEffect(() => {
    // console.log("changed stream");
    const getDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setDevices(devices);
    };
    getDevices();
  }, [stream]);

  return audioInputs;
};

export default useDeviceOptions;

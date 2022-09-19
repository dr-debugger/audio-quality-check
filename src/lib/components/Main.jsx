import React, { useEffect, useRef, useState } from "react";
import useDeviceOptions from "../hooks/useDeviceOptions";
import { getUserMedia } from "../utils/utility";
import DeviceSelection from "./deviceSelection";

const Main = () => {
  const audioSelectInput = useRef(null);
  const [stream, setStream] = useState(null);
  const audioInputs = useDeviceOptions();

  const getStream = async (source) => {
    const result = await getUserMedia(source);
    setStream(result);
  };

  useEffect(() => {
    if (audioSelectInput.current) {
      getStream(audioSelectInput.current.value);
    }
  }, []);
  return (
    <div className="_audio_component_main">
      <div className="_device_selection_box">
        <DeviceSelection ref={audioSelectInput} name={"audioSelectInput"} />
      </div>
    </div>
  );
};

export default Main;

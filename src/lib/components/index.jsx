import React, { useEffect, useRef, useState } from "react";
import useDeviceOptions from "../hooks/useDeviceOptions";
import { getUserMedia } from "../utils/utility";
import AudioVisualization from "./audioVisualization";
import DeviceSelection from "./deviceSelection";

const Main = ({ template }) => {
  const audioSelectInput = useRef(null);
  const [stream, setStream] = useState(null);
  const audioInputs = useDeviceOptions(stream);
  const [seletedValue, setSelectedValue] = useState("default");

  const getStream = async (source) => {
    const result = await getUserMedia(source);
    setStream(result);
  };

  useEffect(() => {
    if (audioSelectInput.current) {
      getStream(audioSelectInput.current.value);
    }
  }, [seletedValue]);

  useEffect(() => {
    getStream();
  }, []);
  return (
    <div className="_audio_component_main">
      <div className="_device_selection_box">
        {audioInputs.length > 0 && (
          <DeviceSelection
            ref={audioSelectInput}
            name={"audioSelectInput"}
            value={seletedValue}
            changeValue={setSelectedValue}
            optionItems={audioInputs}
          />
        )}
      </div>
      <div className="_audio_visualization">
        {stream && <AudioVisualization template={template} stream={stream} />}
      </div>
    </div>
  );
};

Main.defaultProps = {
  template: "default",
};

export default Main;

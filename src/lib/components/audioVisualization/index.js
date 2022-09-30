import React, { useEffect, useState } from "react";
import DefaultView from "./DefaultView";

const AudioVisualization = ({ template, stream }) => {
  const [flag, setFlag] = useState(false);

  const [currentVol, setCurrentVol] = useState(0);

  const getVolume = (stream) => {
    try {
      const audioContext = new AudioContext();

      const source = audioContext.createMediaStreamSource(stream);

      const analyzerNode = new AnalyserNode(audioContext, {
        fftSize: 512,
        minDecibels: -127,
        mixDecibels: 0,
        smoothingTimeConstant: 0.4,
      });

      source.connect(analyzerNode);
      const volumes = new Uint8Array(analyzerNode.frequencyBinCount);

      window.customAudioVolumeCallback = () => {
        analyzerNode.getByteFrequencyData(volumes);
        let volumeSum = 0;
        for (const volume of volumes) volumeSum += volume;
        const averageVolume = volumeSum / volumes.length;
        const value = Math.round(averageVolume / 10);
        const finalValue = value > 20 ? 20 : value < 1 ? 1 : value;
        setCurrentVol(finalValue);
      };

      setFlag(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInterval = () => {
    clearInterval(window.customAudioInterval);
    window.customAudioVolumeCallback = null;
  };

  const startInterval = () => {
    if (window.customAudioInterval) {
      handleInterval();
    }
    window.customAudioInterval = setInterval(
      window.customAudioVolumeCallback,
      100
    );
  };

  useEffect(() => {
    if (flag) {
      startInterval();
    }
  }, [flag]);

  useEffect(() => {
    getVolume(stream);

    return () => {
      handleInterval();
    };
  }, []);

  return (
    <>
      {currentVol > 0 && (
        <>{template === "default" && <DefaultView value={currentVol} />}</>
      )}
    </>
  );
};

export default AudioVisualization;

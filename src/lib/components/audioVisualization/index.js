import React, { useEffect, useState } from "react";

const AudioVisualization = ({ template, stream }) => {
  const [flag, setFlag] = useState(false);
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
        console.log();
      };

      setFlag(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (flag) {
      setInterval(window.customAudioVolumeCallback, 100);
    }
  }, [flag]);

  useEffect(() => {
    getVolume(stream);
  }, []);

  return <div>index</div>;
};

export default AudioVisualization;

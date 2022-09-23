import React from "react";

const DefaultView = ({ value }) => {
  return (
    <div id="default_audio_view">
      <div
        className="_inside_default_view"
        style={{ width: `${value * 5}%` }}
      ></div>
    </div>
  );
};

export default DefaultView;

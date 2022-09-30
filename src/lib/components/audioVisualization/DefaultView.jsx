import React from "react";

const DefaultView = ({ value }) => {
  return (
    <div id="default_audio_view">
      <div
        className="_inside_default_view"
        style={{ width: `${100 - value * 5}%` }}
      ></div>
      <div class="_inside_default_view_background"></div>
    </div>
  );
};

export default DefaultView;

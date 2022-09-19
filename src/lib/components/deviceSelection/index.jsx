import React from "react";

const DeviceSelection = React.forwardRef((props, ref) => {
  const { name, value, changeValue, optionItems } = props;
  return (
    <select
      ref={ref}
      name={name}
      onChange={(e) => {
        changeValue(e.target.value);
      }}
      value={value}
      className="_audi_select"
    >
      {optionItems.map((item) => {
        return (
          <option
            key={item.id}
            value={item.id}
            className="_audio_select_option"
          >
            {item.label}
          </option>
        );
      })}
    </select>
  );
});

export default DeviceSelection;

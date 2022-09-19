import React from "react";

const DeviceSelection = React.forwardRef((props, ref) => {
  const { name } = props;
  //   console.log(name);
  return <select ref={ref} name={name}></select>;
});

export default DeviceSelection;

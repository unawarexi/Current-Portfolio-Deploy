import React from "react";

const DatePicker = ({
  selected,
  onChange,
  className,
  ...props
}) => {
  return (
    <input
      type="date"
      className={className}
      value={selected ? selected.toISOString().split("T")[0] : ""}
      onChange={(e) => {
        const date = e.target.value ? new Date(e.target.value) : null;
        onChange(date);
      }}
      {...props}
    />
  );
};

export default DatePicker;

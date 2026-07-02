import React from "react";

const CourseTypeDropdown = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input"
    >
      <option value="">Select Training Type</option>
      <option value="Academic">Academic</option>
      <option value="Retail">Retail</option>
    </select>
  );
};

export default CourseTypeDropdown;
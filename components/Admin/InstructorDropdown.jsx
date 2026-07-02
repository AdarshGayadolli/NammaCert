import React from "react";
import instructors from "../../data/instructors.json";

const InstructorDropdown = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input"
    >
      <option value="">Select Instructor</option>
      {instructors.map((ins) => (
        <option key={ins.id} value={ins.id}>
          {ins.name}
        </option>
      ))}
    </select>
  );
};

export default InstructorDropdown;
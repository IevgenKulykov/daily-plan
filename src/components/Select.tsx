import React from 'react';

interface SelectProps {
  value: number;
  onChange: (value: number) => void;
  options: number[];
  testId?: string;
}

const Select: React.FC<SelectProps> = ({ value, onChange, options, testId }) => {
    return (
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        data-testid={testId}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };
  
  export default Select;
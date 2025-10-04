import React from "react";

interface TagCheckboxProps {
  id: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TagCheckbox = React.memo(
  ({ id, value, label, checked, onChange }: TagCheckboxProps) => {
    return (
      <div className="mr-5 flex items-center">
        <input
          type="checkbox"
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id} className="ml-2">
          {label}
        </label>
      </div>
    );
  }
);

TagCheckbox.displayName = "TagCheckbox";

export default TagCheckbox;

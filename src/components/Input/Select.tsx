import { SelectOptionsType } from "@/lib/types";

export const Select = ({
  options,
  defaultValue,
  onChange,
  isDisabled = false,
}: {
  options: SelectOptionsType[];
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isDisabled?: boolean;
}) => {
  return (
    <div>
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={isDisabled}
        className="text-black"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

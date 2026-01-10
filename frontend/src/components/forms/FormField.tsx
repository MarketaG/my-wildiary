type FormFieldProps = {
  label: string;
  name: string;
  type?: "text" | "number" | "url";
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  step?: string;
  placeholder?: string;
  helpText?: string;
};

export function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  step,
  placeholder,
  helpText,
}: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-text-muted">
        {label} {required && "*"}
      </label>

      {helpText && (
        <p className="text-xs text-text-muted leading-snug">{helpText}</p>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        step={step}
        placeholder={placeholder}
        className="
            w-full rounded-lg
            border border-border
            bg-background
            px-3 py-2 text-sm
            transition
            focus:outline-none
            focus:ring-2 focus:ring-accent/40
            focus:border-accent
          "
      />
    </div>
  );
}

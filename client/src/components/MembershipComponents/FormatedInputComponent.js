import React, { useEffect } from "react";
import { formatInputValue } from "../../utils/formatInputValue";

const FormatedInputComponent = ({
  name,
  type,
  placeholder,
  value,
  field,
  form,
  unit,
  selectedOption,
  ...props
}) => {
  const handleInputChange = (e) => {
    const { name, value, dataset } = e.target;

    if (dataset.unit && value.trim() !== "") {
      const trimmedValue = formatInputValue(value, dataset.unit);
      form.setFieldValue(name, trimmedValue);
    } else {
      form.setFieldValue(name, value);
    }
  };

  const handleInputBlur = (e) => {
    const { name, value, dataset } = e.target;

    if (dataset.unit && value.trim() !== "") {
      const trimmedValue = formatInputValue(value, dataset.unit);
      const formattedValue =
        trimmedValue.endsWith(".") || trimmedValue.endsWith(",")
          ? trimmedValue + "00"
          : trimmedValue.includes(".")
          ? trimmedValue.replace(
              /\.(\d$|\.$)/,
              (match, group1) => `.${group1 || "00"}`
            )
          : trimmedValue.length > 0 && !trimmedValue.endsWith(".")
          ? `${trimmedValue}.00`
          : "";

      form.setFieldValue(name, formattedValue + dataset.unit);
    } else {
      form.setFieldValue(name, value);
    }
  };

  const handleInputFocus = (e) => {
    const { name, value, dataset } = e.target;

    if (dataset.unit && value.trim() !== "") {
      const trimmedValue = formatInputValue(value, dataset.unit);
      form.setFieldValue(name, trimmedValue + dataset.unit);
    } else {
      form.setFieldValue(name, value);
    }
  };

  useEffect(() => {
    if (selectedOption) {
      form.setFieldValue(field.name, selectedOption?.value?.[field.name]);
    }
  }, [selectedOption, field.name]);

  return (
    <input
      {...field}
      {...props}
      name={field.name}
      type={type || "text"}
      className="w-full p-2 border-2 border-gray-300 rounded-md h-9 lg:h-11"
      placeholder={placeholder}
      data-unit={unit}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      onFocus={handleInputFocus}
    />
  );
};

export default FormatedInputComponent;

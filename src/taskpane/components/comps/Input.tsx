import React, { useEffect, useMemo, useState } from "react";
import { Dropdown, TextField } from "@fluentui/react";
import { prefixDate } from "../../../commands/commands";
/* global Office */

export interface InputProps {
  type: "delivery" | "reference" | "custom";
  name: string;
  description: string;
  required?: boolean;
  options?: Array<string>;
  layout?: "text" | "select";
  multiSelect?: boolean;
}

interface Props {
  input: InputProps;
  setData: (key: string, value: any) => void;
}

const getInputKey = (inputName: string, inputType: InputProps["type"]) => {
  switch (inputType) {
    case "delivery":
      return "DeliveryTime";
    case "reference":
      return "reference";
    default:
      return `text-${inputName}`;
  }
};

const InputComponent = ({ input, setData }: Props) => {
  const [dropdownValues, setDropdownValues] = useState<Array<string>>(null);

  const inputKey = getInputKey(input.name, input.type);

  useEffect(() => {
    if (!dropdownValues) return;
    setData(inputKey, dropdownValues.join(","));
  }, [dropdownValues]);

  const inputData = useMemo(() => {
    switch (input.type) {
      case "delivery": {
        const startTime = Office.context.mailbox.item.start;
        const actualTime = `${prefixDate(startTime.getHours())}:${prefixDate(startTime.getMinutes())}`;

        setData(inputKey, actualTime);

        return { value: actualTime, placeholder: "HH:MM" };
      }

      default:
        return { value: input.options?.[0] || null, placeholder: input.description || input.name };
    }
  }, []);

  if (input.layout === "select" || input.options?.length)
    return (
      <Dropdown
        options={input.options.map((option) => ({ key: option, text: option }))}
        label={input.name}
        placeholder={inputData.placeholder}
        defaultValue={inputData.value}
        required={input.required}
        multiSelect={input.multiSelect}
        style={{ width: 300 }}
        onChange={(_, e) =>
          input.multiSelect
            ? setDropdownValues((values) =>
                e.selected ? [...(values || []), e.text] : values?.filter((v) => v !== e.text)
              )
            : setData(inputKey, e.text)
        }
      />
    );

  return (
    <TextField
      name={input.name}
      defaultValue={inputData.value}
      placeholder={inputData.placeholder}
      label={input.name}
      description={input.description}
      required={input.required}
      style={{ width: 300 }}
      onChange={(_, e) => setData(inputKey, e)}
    />
  );
  // return <pre style={{ width: 300 }}>{JSON.stringify(input, null, 2)}</pre>;
};

export default InputComponent;

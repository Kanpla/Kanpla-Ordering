import React from "react";
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
  multiselect?: boolean;
}

interface Props {
  input: InputProps;
}

const InputComponent = ({ input }: Props) => {
  const getData = () => {
    switch (input.type) {
      case "delivery": {
        const startTime = Office.context.mailbox.item.start;
        const actualTime = `${prefixDate(startTime.getHours())}:${prefixDate(startTime.getMinutes())}`;

        return { value: actualTime, placeholder: "HH:MM" };
      }

      default:
        return { value: input.options?.[0] || null, placeholder: input.description || input.name };
    }
  };

  const inputData = getData();

  if (input.layout === "select" || input.options?.length)
    return (
      <Dropdown
        options={input.options.map((option) => ({ key: option, text: option }))}
        label={input.name}
        placeholder={inputData.placeholder}
        defaultValue={inputData.value}
        required={input.required}
        multiSelect={input.multiselect}
        style={{ width: 300 }}
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
    />
  );
  // return <pre style={{ width: 300 }}>{JSON.stringify(input, null, 2)}</pre>;
};

export default InputComponent;

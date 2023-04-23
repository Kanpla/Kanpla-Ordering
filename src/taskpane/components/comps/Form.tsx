import { Dropdown, PrimaryButton, Spinner } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { MODULES, axiosGet } from "../../../settings";
import Input, { InputProps } from "./Input";
import { AxiosError } from "axios";
/* global Office */

const Form = () => {
  const [moduleId, setModuleId] = useState<string>(null);

  const [inputs, setInputs] = useState<Array<InputProps>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!moduleId) return;
    (async () => {
      setLoading(true);
      await axiosGet(`modules/${moduleId}/inputs`)
        .then((input) => setInputs(input.data.response.inputs))
        .catch((e: AxiosError) => {
          Office.context.mailbox.item.notificationMessages.addAsync("link", {
            type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
            message: `${e?.message}: ${(e?.response?.data as any)?.reasonPhrase}`,
            icon: "Icon.80x80",
            persistent: true,
          });
        });
      setLoading(false);
    })();
  }, [moduleId]);

  const openLink = () => {
    Office.context.mailbox.item.notificationMessages.addAsync("link", {
      type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
      message: "Link will open",
      icon: "Icon.80x80",
      persistent: true,
    });
  };

  return (
    <div>
      <Dropdown
        options={MODULES}
        placeholder="Choose a module to order for"
        label="Choose a module"
        style={{ width: "100%", marginBottom: "2rem" }}
        /** @ts-ignore */
        onChange={(_, e) => setModuleId(e.key)}
      />
      {loading && <Spinner />}
      {inputs.map((input) => (
        <Input input={input} key={input.name} />
      ))}
      <PrimaryButton disabled={!moduleId} onClick={openLink} style={{ marginTop: "2rem" }}>
        Order now
      </PrimaryButton>
    </div>
  );
};

export default Form;

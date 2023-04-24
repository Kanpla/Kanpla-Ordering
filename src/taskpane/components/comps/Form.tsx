import { Dropdown, PrimaryButton, Spinner } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { APP_URL, MODULES, SALESPLACE_ID, axiosGet } from "../../../settings";
import Input, { InputProps } from "./Input";
import { AxiosError } from "axios";
import { prefixDate } from "../../../commands/commands";
/* global Office, window */

const Form = () => {
  const [moduleId, setModuleId] = useState<string>(null);

  const [inputs, setInputs] = useState<Array<InputProps>>([]);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({});

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
    const finalData: any = data || {};
    const day = prefixDate(Office.context.mailbox.item.start.getDate());
    const month = prefixDate(Office.context.mailbox.item.start.getMonth() + 1);
    const year = prefixDate(Office.context.mailbox.item.start.getFullYear());

    finalData.meetingDate = `${day}${month}${year}`;
    finalData.meetingName = Office.context.mailbox.item.subject;
    if (finalData?.DeliveryTime) finalData.DeliveryTime = finalData.DeliveryTime?.replace(":", "");

    const url = new URL(`${APP_URL}/app/s/${SALESPLACE_ID}/m/${moduleId}`);
    Object.entries(finalData).map(([key, value]: [string, string]) => {
      if (key.startsWith("text-"))
        return value
          .split(",")
          .map((singleValue) => url.searchParams.append(key, encodeURIComponent(String(singleValue))));
      return url.searchParams.append(key, encodeURIComponent(String(value)));
    });

    window.open(url);
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
        <Input input={input} key={input.name} setData={(key, value) => setData((d) => ({ ...d, [key]: value }))} />
      ))}
      <PrimaryButton disabled={!moduleId} onClick={openLink} style={{ marginTop: "2rem" }}>
        Order now
      </PrimaryButton>
    </div>
  );
};

export default Form;

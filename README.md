<img src="./assets/icon-64.png" alt="Kanpla icon">
# Kanpla ordering Outlook add-in

With this add-in, you can extend Outlook appointments with a simple extension that opens a Kanpla link for meeting catering services.

## Get started

- You will need to deploy and host this add-in yourself (at the moment), so don't forget to rewrite all localhost values in the code!

### What you will need from Kanpla

Reach out to kontakt@kanpla.dk to get an API key and any other help for your integration.

- API key (write what partner and why you need an API key)
- Module IDs (can be found [in Kanpla Admin under _settings_](https://admin.kanpla.dk/dashboard/settings/modules))
- Salesplace ID - at this point, you can only use one salesplace ID. You can find the ID [in Kanpla Admin under _settings_](https://admin.kanpla.dk/dashboard/settings/productBanks).
- Your partner's custom domain

### Update `src/settings.ts`

With the forementioned data, you need to now update the settings file, which can be found under `src/settings.ts`. Replace or review the following values:

- APP_NAME
- APP_URL
- API_KEY
- SALESPLACE_ID
- MODULES

### Update `manifest.xml`

Manifest is used to handle how the app interacts with Outlook, up until the user opens the pane (the pane uses React to run).

You can update the logos (find them under the `assets` folder), description, and name of your add-in.

## Install and use the app

In your Outlook installation, in the top bar, click on the three dots (...) and **Get Add-ins**.

When the window opens, navigate to **My add-ins** and there under **Custom Addins** click on **Add a custom add-in** and **Add from a file**.

Then a file explorer window will pop up, where you should choose the add-ins `manifest.xml` file. This will initiate your app by default called "Kanpla ordering".

When you click on this button, it will open a pane that loads your app (that you've deployed) and navigates you to create a link that opens a Kanpla app (or any other app in your custom domains) with the text information prefilled.

## Custom field handling

If you have custom fields to handle, e.g. amount of participants, which is exposed in the `Office` class, you can intercept the fields in `src/taskpane/components/comps/Input.tsx` using the `inputData` memo, where under default, you would have to handle the custom text input and then prefill the value based on the name of the input.

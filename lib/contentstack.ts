import Contentstack from "contentstack";

const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const previewToken = process.env.CONTENTSTACK_PREVIEW_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT || "development";
const livePreviewEnabled = process.env.NEXT_PUBLIC_LIVE_PREVIEW_ENABLED === "true";

const hasValidValue = (value?: string) => Boolean(value && !value.startsWith("YOUR_") && value.trim() !== "");

const Stack: any =
  hasValidValue(apiKey) && hasValidValue(deliveryToken)
    ? Contentstack.Stack({
        api_key: apiKey as string,
        delivery_token: deliveryToken as string,
        environment,
        live_preview: {
          enable: livePreviewEnabled,
          preview_token: previewToken as string,
          host: "rest-preview.contentstack.com",
        },
      })
    : null;

export const contentstackConfigured = Boolean(Stack);
export default Stack;

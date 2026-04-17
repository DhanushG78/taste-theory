import Contentstack from "contentstack";

const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT || "development";

const hasValidValue = (value?: string) => Boolean(value && !value.startsWith("YOUR_") && value.trim() !== "");

const Stack: any =
  hasValidValue(apiKey) && hasValidValue(deliveryToken)
    ? Contentstack.Stack({
        api_key: apiKey as string,
        delivery_token: deliveryToken as string,
        environment,
      })
    : null;

export const contentstackConfigured = Boolean(Stack);
export default Stack;

"use client";

import ContentstackLivePreview from "@contentstack/live-preview-utils";

let isPreviewInitialized = false;

export const initLivePreview = () => {
  if (typeof window !== "undefined" && !isPreviewInitialized) {
    ContentstackLivePreview.init({
      enable: process.env.NEXT_PUBLIC_LIVE_PREVIEW_ENABLED === "true",
      stackDetails: {
        apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || process.env.CONTENTSTACK_API_KEY || "",
        environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || process.env.CONTENTSTACK_ENVIRONMENT || "development",
      },
      clientUrlParams: {
        host: "rest-preview.contentstack.com",
      },
    });
    isPreviewInitialized = true;
  }
};

export const onEntryChange = (callback: () => void) => {
  if (typeof window !== "undefined") {
    ContentstackLivePreview.onEntryChange(callback);
  }
};


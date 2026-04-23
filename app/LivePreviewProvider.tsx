"use client";

import { useEffect } from "react";
import { initLivePreview } from "@/lib/livePreview";

export default function LivePreviewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initLivePreview();
  }, []);

  return <>{children}</>;
}

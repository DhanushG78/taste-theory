'use client';

import { useEffect } from 'react';
import { initLivePreview } from '@/lib/livePreview';

export default function LivePreviewProvider({ children }: any) {

  useEffect(() => {
    console.log("🔥 Live Preview Init Running");
    // Uses the shared initLivePreview() from lib/livePreview.ts
    // Avoids double-initialization if this component re-renders
    initLivePreview();
  }, []);

  return children;
}

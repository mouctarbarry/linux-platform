'use client';

import { useState, useCallback } from 'react';

interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
  reset: () => void;
}

export function useCopyToClipboard(resetDelay = 2000): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- SSR guard
      if (typeof navigator === 'undefined' || !navigator.clipboard) {
        console.warn('useCopyToClipboard: Clipboard API non disponible');
        return;
      }
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, resetDelay);
      } catch (err) {
        console.error('useCopyToClipboard: Erreur de copie', err);
        setCopied(false);
      }
    },
    [resetDelay],
  );

  const reset = useCallback(() => {
    setCopied(false);
  }, []);

  return { copied, copy, reset };
}

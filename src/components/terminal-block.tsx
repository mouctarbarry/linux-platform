'use client';

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

interface TerminalBlockProps {
  command: string;
  output?: string;
}

export function TerminalBlock({ command, output }: TerminalBlockProps) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="group relative my-5 overflow-hidden rounded-xl border border-border bg-terminal-bg shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <button
          onClick={() => void copy(command)}
          className="rounded-md px-2.5 py-1 text-xs font-medium text-terminal-comment opacity-0 transition-all hover:bg-white/10 hover:text-terminal-text group-hover:opacity-100"
        >
          {copied ? 'Copie !' : 'Copier'}
        </button>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed">
        <div className="text-terminal-green">
          <span className="text-terminal-comment">$ </span>
          {command}
        </div>
        {output && (
          <div className="mt-2 whitespace-pre-wrap text-terminal-text">{output}</div>
        )}
      </div>
    </div>
  );
}

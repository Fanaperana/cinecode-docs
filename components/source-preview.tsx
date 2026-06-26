'use client';

import { useEffect, useState } from 'react';

interface SourceTabFile {
  path: string;
  role: string;
  code?: string;
  url: string;
  rawUrl: string;
}

interface SourceBundleTabsProps {
  files: SourceTabFile[];
}

interface SourcePreviewProps {
  code?: string;
  rawUrl?: string;
}

export function SourceBundleTabs({ files }: SourceBundleTabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = files[selectedIndex];

  if (!selected) return null;

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Video source files">
        {files.map((file, index) => {
          const active = index === selectedIndex;

          return (
            <button
              key={file.path}
              type="button"
              role="tab"
              aria-selected={active}
              className={[
                'rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors',
                active
                  ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                  : 'border-fd-border bg-fd-background text-fd-muted-foreground hover:text-fd-foreground',
              ].join(' ')}
              onClick={() => setSelectedIndex(index)}
            >
              {file.path}
            </button>
          );
        })}
      </div>

      <div className="mt-3 rounded-md border border-fd-border/70 bg-fd-background/60 p-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="font-mono text-sm text-fd-foreground">{selected.path}</div>
            <div className="text-sm text-fd-muted-foreground">{selected.role}</div>
          </div>
          <a
            className="text-xs font-medium text-fd-primary underline underline-offset-4"
            href={selected.url}
            target="_blank"
            rel="noreferrer"
          >
            Open full file
          </a>
        </div>
        <SourcePreview
          key={selected.path}
          code={selected.code}
          rawUrl={selected.rawUrl}
        />
      </div>
    </div>
  );
}

export function SourcePreview({ code, rawUrl }: SourcePreviewProps) {
  const [remoteCode, setRemoteCode] = useState<string | undefined>(code);
  const [state, setState] = useState<'idle' | 'loading' | 'error'>(
    code ? 'idle' : 'loading',
  );

  useEffect(() => {
    if (code || !rawUrl) return;

    let cancelled = false;
    fetch(rawUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((text) => {
        if (cancelled) return;
        setRemoteCode(text.trimEnd());
        setState('idle');
      })
      .catch(() => {
        if (cancelled) return;
        setState('error');
      });

    return () => {
      cancelled = true;
    };
  }, [code, rawUrl]);

  if (state === 'loading') {
    return (
      <div className="mt-2 rounded-md border border-fd-border bg-fd-muted/30 p-3 text-xs text-fd-muted-foreground">
        Loading source preview...
      </div>
    );
  }

  if (state === 'error' || !remoteCode) {
    return (
      <div className="mt-2 rounded-md border border-fd-border bg-fd-muted/30 p-3 text-xs text-fd-muted-foreground">
        Source preview could not load. Use the file link above.
      </div>
    );
  }

  return (
    <pre className="mt-2 max-h-[28rem] overflow-auto rounded-md border border-fd-border bg-fd-muted/40 p-3 text-xs leading-5">
      <code>{remoteCode}</code>
    </pre>
  );
}
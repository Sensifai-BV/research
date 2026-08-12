import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Download, Quote } from 'lucide-react';
import { Button } from './Button';

export function CitationDialog({ paper, isOpen, onClose }) {
  const [activeFormat, setActiveFormat] = useState('bibtex');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      import('canvas-confetti').then((module) => {
        const confetti = module.default;
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      });
    }
  }, [isOpen]);

  if (!isOpen || !paper) return null;

  const getCitationText = () => {
    switch (activeFormat) {
      case 'bibtex':
        return paper.bibtex;
      case 'apa':
        const apaAuthors = paper.authors.map(a => a.name).join(', ');
        return `${apaAuthors} (${paper.year}). ${paper.title}. ${paper.venue}. https://doi.org/${paper.doi}`;
      case 'mla':
        const mlaAuthors = paper.authors.map(a => a.name).join(', ');
        return `${mlaAuthors}. "${paper.title}." ${paper.venue}, ${paper.year}.`;
      case 'ieee':
        const ieeeAuthors = paper.authors.map(a => a.name).join(', ');
        return `${ieeeAuthors}, "${paper.title}," in ${paper.venue}, ${paper.year}, doi: ${paper.doi}.`;
      case 'ris':
        const risAuthors = paper.authors.map(a => `AU  - ${a.name}`).join('\n');
        return `TY  - JOUR\nTI  - ${paper.title}\n${risAuthors}\nJO  - ${paper.venue}\nPY  - ${paper.year}\nDO  - ${paper.doi}\nER  -`;
      default:
        return paper.bibtex;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCitationText());
    setCopied(true);
    import('canvas-confetti').then((module) => {
      const confetti = module.default;
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadBib = () => {
    const blob = new Blob([paper.bibtex], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${paper.id}.bib`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formats = [
    { id: 'bibtex', label: 'BibTeX' },
    { id: 'apa', label: 'APA' },
    { id: 'mla', label: 'MLA' },
    { id: 'ieee', label: 'IEEE' },
    { id: 'ris', label: 'RIS' }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-6 shadow-xl transition-all cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
          <div className="flex items-center gap-2 text-zinc-950 font-extrabold text-base">
            <Quote className="h-4 w-4 text-indigo-600" />
            Cite Publication
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-950 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Paper Title Summary */}
        <div className="mt-4 rounded-lg bg-zinc-50 p-3.5 border border-zinc-200/70">
          <div className="text-xs font-bold text-zinc-950 leading-snug">{paper.title}</div>
          <div className="text-[11px] text-zinc-500 mt-1 font-medium">
            {paper.authors.map(a => a.name).join(', ')} ({paper.year}) • {paper.venue}
          </div>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex items-center gap-1 mt-5 border-b border-zinc-100 pb-2">
          {formats.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFormat(f.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                activeFormat === f.id
                  ? 'bg-zinc-950 text-white shadow-2xs'
                  : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Citation Box */}
        <div className="relative mt-4">
          <pre className="max-h-48 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-xs text-zinc-100 font-mono leading-relaxed whitespace-pre-wrap">
            {getCitationText()}
          </pre>
          
          <button
            onClick={handleCopy}
            className="absolute right-3 top-3 rounded-md bg-zinc-800/90 hover:bg-zinc-700 p-1.5 text-xs font-bold text-zinc-200 transition-colors flex items-center gap-1 border border-zinc-700"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-100">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadBib}
            className="gap-1.5 border-zinc-300 text-xs font-bold text-zinc-800"
          >
            <Download className="h-3.5 w-3.5 text-indigo-600" />
            Download .BIB
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={onClose}
            className="bg-zinc-950 text-white rounded-full font-bold text-xs px-5"
          >
            Done
          </Button>
        </div>

      </div>
    </div>
  );
}

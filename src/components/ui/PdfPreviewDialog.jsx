import React from 'react';
import { X, Download, FileText, ExternalLink } from 'lucide-react';
import { Button } from './Button';

export function PdfPreviewDialog({ paper, isOpen, onClose }) {
  if (!isOpen || !paper) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-[88vh] flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl dark:shadow-none overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-900 shadow-2xs dark:shadow-none">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-950 dark:text-zinc-50 text-base line-clamp-1">{paper.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{paper.venue} ({paper.year})</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href={paper.pdfUrl} target="_blank" rel="noreferrer">
              <Button size="sm" className="gap-1.5 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-2xs dark:shadow-none font-bold text-xs">
                <Download className="h-3.5 w-3.5" />
                Download
              </Button>
            </a>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-400 dark:text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Embedded PDF Frame */}
        <div className="flex-1 bg-zinc-100 dark:bg-zinc-800 p-2 overflow-hidden flex flex-col items-center justify-center">
          <iframe
            src={`${paper.pdfUrl}#toolbar=0`}
            title={`PDF Preview for ${paper.title}`}
            className="hidden sm:block w-full h-full border-0 rounded-lg bg-white dark:bg-zinc-950 shadow-inner"
          />
          <div className="sm:hidden flex flex-col items-center justify-center p-6 text-center space-y-4">
            <FileText className="h-16 w-16 text-zinc-300 dark:text-zinc-700" />
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              PDF preview is not available on mobile browsers.
            </p>
            <a href={paper.pdfUrl} target="_blank" rel="noreferrer">
              <Button size="lg" className="bg-indigo-600 text-white dark:text-zinc-900 font-bold rounded-full gap-2 shadow-md dark:shadow-none hover:bg-indigo-700">
                <ExternalLink className="h-4 w-4" />
                Open PDF in New Tab
              </Button>
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-500 dark:text-zinc-400">
          <span>Viewing paper preview for {paper.id}.pdf</span>
          <div className="flex items-center gap-3">
            <a href={paper.pdfUrl} target="_blank" rel="noreferrer" className="text-indigo-600 font-semibold hover:underline inline-flex items-center gap-1">
              Open in full window <ExternalLink className="h-3 w-3" />
            </a>
            <Button variant="outline" size="sm" onClick={onClose} className="h-7 text-xs">
              Close Preview
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

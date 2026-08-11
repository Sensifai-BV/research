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
        className="relative w-full max-w-5xl h-[88vh] flex flex-col rounded-xl border border-zinc-200 bg-white shadow-2xl overflow-hidden cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-50/80">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white shadow-2xs">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-zinc-950 text-base line-clamp-1">{paper.title}</h3>
              <p className="text-xs text-zinc-500 font-medium">{paper.venue} ({paper.year})</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a href={paper.pdfUrl} target="_blank" rel="noreferrer">
              <Button size="sm" className="gap-1.5 bg-zinc-950 text-white hover:bg-zinc-800 shadow-2xs font-bold text-xs">
                <Download className="h-3.5 w-3.5" />
                Download
              </Button>
            </a>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Embedded PDF Frame */}
        <div className="flex-1 bg-zinc-100 p-2 overflow-hidden">
          <iframe
            src={`${paper.pdfUrl}#toolbar=0`}
            title={`PDF Preview for ${paper.title}`}
            className="w-full h-full border-0 rounded-lg bg-white shadow-inner"
          />
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-zinc-200 bg-white text-xs text-zinc-500">
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

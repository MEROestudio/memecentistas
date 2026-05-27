import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Printer, Info } from 'lucide-react';

interface PrintInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appUrl: string;
}

export default function PrintInstructionsModal({
  isOpen,
  onClose,
  appUrl
}: PrintInstructionsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyUrl = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col animate-in fade-in duration-200">
        {/* Header */}
        <div className="bg-slate-950 text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-indigo-500/20 text-indigo-300 rounded-lg">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight">Impresión e Informe PDF bloqueado</h3>
              <p className="text-[10px] text-slate-400 font-mono">FRAMEWORK SANDBOX NOTICE</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="flex gap-3 bg-indigo-50 border border-indigo-100/60 p-4 rounded-xl text-xs text-indigo-950 leading-relaxed">
            <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong>¿Por qué ocurre esto?</strong> Los navegadores modernos bloquean la impresión y el guardado directo de PDF desde marcos integrados (iframe) de desarrollo por motivos de seguridad del sistema.
            </div>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Dos pasos sencillos para descargar o imprimir tu PDF:</h4>
            
            <div className="space-y-3">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-mono text-xs font-bold text-slate-700 shrink-0 mt-0.5">
                  1
                </div>
                <div className="space-y-1.5 flex-1">
                  <span className="text-xs font-semibold text-slate-800 block">Copia el enlace de este reporte público</span>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Este enlace te permite ver tu reporte interactivo fuera del editor en pantalla completa y compartirlo directamente con tus clientes o colegas.
                  </p>
                  
                  <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1.5 pl-3">
                    <span className="text-[11px] font-mono text-slate-600 truncate flex-1">{appUrl}</span>
                    <button
                      onClick={copyUrl}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition-all shrink-0 ${copied ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-mono text-xs font-bold text-slate-700 shrink-0 mt-0.5">
                  2
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-800 block">Ábrelo e Imprime</span>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    Pega el enlace en una pestaña nueva del navegador. Una vez allí, haz clic en el botón <strong className="text-slate-800 font-semibold inline-flex items-center gap-0.5"><Printer className="w-3 h-3 text-indigo-500" /> Imprimir </strong> en la barra superior o presiona <kbd className="bg-slate-100 border border-slate-200 px-1 py-0.5 rounded font-mono text-[10px]">Ctrl + P</kbd> / <kbd className="bg-slate-100 border border-slate-200 px-1 py-0.5 rounded font-mono text-[10px]">Cmd + P</kbd>.
                  </p>
                  <p className="text-[11px] text-emerald-600 font-medium">
                    ¡De esta forma se abrirá la interfaz del navegador y podrás guardarlo como un PDF perfectamente paginado de alto nivel!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 flex gap-2.5 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-600 rounded-lg transition-colors"
          >
            Cerrar instrucciones
          </button>
          <a
            href={appUrl}
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Ir de todos modos</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { Upload, FileImage, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScreenshotUploaderProps {
  onDataExtracted: (extractedData: any) => void;
}

export default function ScreenshotUploader({ onDataExtracted }: ScreenshotUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecciona una imagen de captura de pantalla (PNG, JPG o WEBP).');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      // Step 1: Read file as base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = reader.result as string;
          // Extract pure base64 data by removing the data:*/*;base64, prefix
          const base64Data = result.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = (err) => reject(err);
      });

      // Step 2: Call Server API
      const response = await fetch('/api/analyze-screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64,
          mimeType: file.type
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Error del servidor (${response.status})`);
      }

      const json = await response.json();
      console.log("Screenshot data extracted:", json);

      if (json.error) {
        throw new Error(json.error);
      }

      onDataExtracted(json);
      setSuccessMsg(json.summaryText || 'Captura de pantalla analizada con éxito. Datos actualizados.');
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'No se pudo conectar con el servidor o procesar la imagen.');
    } finally {
      setIsLoading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-6 hover:border-blue-400 transition-colors relative">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center text-center cursor-pointer min-h-[160px] pb-2 ${isDragging ? 'bg-blue-50/50' : ''}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChange}
          disabled={isLoading}
        />

        <div className={`p-4 rounded-full mb-3 transition-transform ${isLoading ? 'bg-blue-100/50 text-blue-600 animate-pulse' : 'bg-white shadow-sm text-slate-400 group-hover:scale-105'}`}>
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Upload className="w-6 h-6 text-slate-500" />
          )}
        </div>

        {isLoading ? (
          <div>
            <p className="text-sm font-semibold text-slate-700">Analizando captura de pantalla con Gemini...</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm px-4">
              Extrayendo texto, porcentaje de interacción, cifras de alcance y datos demográficos e integrándolos en tu reporte.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-semibold text-slate-700">
              Arrastra aquí capturas de Instagram Insights
            </p>
            <p className="text-xs text-slate-500 mt-1">
              O haz <span className="text-blue-600 font-medium hover:underline">clic para buscar la imagen</span>
            </p>
            <p className="text-[10px] text-slate-400 mt-2 font-mono uppercase bg-slate-100/60 px-2.5 py-1 rounded-md inline-block">
              Soporta: Alcance, Demografía o Publicaciones
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4.5 bg-emerald-50 border border-emerald-100 rounded-lg flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-800">
              <span className="font-bold block mb-1">¡Imagen Procesada!</span>
              {successMsg}
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-4.5 bg-rose-50 border border-rose-100 rounded-lg flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-800">
              <span className="font-bold block mb-1">Error de Lectura</span>
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

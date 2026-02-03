'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import type { StaffProfile } from './types';

interface StaffFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: StaffProfile | null;
  onSave: (data: {
    displayName: string;
    jobTitle: string;
    specialties: string[];
    employmentType: string;
    isPublic: boolean;
    status: string;
    photoUrl?: string;
  }) => void;
  isSaving: boolean;
  locationId?: string;
}

function StaffFormModal({
  open,
  onOpenChange,
  staff,
  onSave,
  isSaving,
  locationId,
}: StaffFormModalProps) {
  const [formData, setFormData] = useState({
    displayName: '',
    jobTitle: '',
    specialties: [] as string[],
    employmentType: 'full_time',
    isPublic: true,
    status: 'active',
    photoUrl: '',
  });
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Per favore seleziona un file immagine (PNG, JPEG, WebP)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Il file è troppo grande. Massimo 2MB');
      return;
    }

    setIsUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      if (locationId) formDataUpload.append('locationId', locationId);
      if (staff?.id) formDataUpload.append('staffId', staff.id);

      const res = await fetch('/api/upload/staff-photo', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, photoUrl: data.url }));
      } else {
        alert(data.error || "Errore durante l'upload");
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert("Errore durante l'upload");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  // Reset form when modal opens/closes or staff changes
  useEffect(() => {
    if (staff) {
      setFormData({
        displayName: staff.displayName,
        jobTitle: staff.jobTitle,
        specialties: staff.specialties,
        employmentType: staff.employmentType,
        isPublic: staff.isPublic,
        status: staff.status,
        photoUrl: staff.photoUrl || '',
      });
    } else {
      setFormData({
        displayName: '',
        jobTitle: '',
        specialties: [],
        employmentType: 'full_time',
        isPublic: true,
        status: 'active',
        photoUrl: '',
      });
    }
    setSpecialtyInput('');
  }, [staff, open]);

  const addSpecialty = () => {
    if (specialtyInput.trim() && !formData.specialties.includes(specialtyInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, specialtyInput.trim()],
      }));
      setSpecialtyInput('');
    }
  };

  const removeSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== specialty),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.displayName.trim() || !formData.jobTitle.trim()) return;
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{staff ? 'Modifica Staff' : 'Aggiungi Staff'}</DialogTitle>
          <DialogDescription>
            {staff
              ? 'Modifica le informazioni del membro del team'
              : 'Aggiungi un nuovo membro al team'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome visualizzato *</label>
            <input
              type="text"
              required
              value={formData.displayName}
              onChange={(e) => setFormData((prev) => ({ ...prev, displayName: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Es: Marco R."
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Ruolo *</label>
            <input
              type="text"
              required
              value={formData.jobTitle}
              onChange={(e) => setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Es: Barista, Cameriere, Chef"
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo contratto</label>
            <select
              value={formData.employmentType}
              onChange={(e) => setFormData((prev) => ({ ...prev, employmentType: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="full_time">Full-time</option>
              <option value="part_time">Part-time</option>
              <option value="seasonal">Stagionale</option>
              <option value="intern">Stagista</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Stato</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="active">Attivo</option>
              <option value="on_leave">In ferie</option>
              <option value="terminated">Non attivo</option>
            </select>
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Specialità</label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                value={specialtyInput}
                onChange={(e) => setSpecialtyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSpecialty();
                  }
                }}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Es: Latte Art, Cocktail"
              />
              <button
                type="button"
                onClick={addSpecialty}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                +
              </button>
            </div>
            {formData.specialties.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {formData.specialties.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-600"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => removeSpecialty(s)}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Foto</label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`mt-1 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : formData.photoUrl
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
              {isUploading ? (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                  Caricamento...
                </div>
              ) : formData.photoUrl ? (
                <div className="flex items-center gap-3">
                  <img
                    src={formData.photoUrl}
                    alt="Preview"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-green-700">Foto caricata</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData((prev) => ({ ...prev, photoUrl: '' }));
                      }}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <svg
                    className="mb-2 h-8 w-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-blue-600">Clicca</span> o trascina una foto
                  </p>
                  <p className="mt-1 text-xs text-gray-400">PNG, JPEG, WebP (max 2MB)</p>
                </>
              )}
            </div>
          </div>

          {/* Public Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
            <div>
              <p className="text-sm font-medium text-gray-900">Visibile ai clienti</p>
              <p className="text-xs text-gray-500">Il profilo sarà visibile sul menu digitale</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={formData.isPublic}
              onClick={() => setFormData((prev) => ({ ...prev, isPublic: !prev.isPublic }))}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                formData.isPublic ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.isPublic ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <DialogFooter className="gap-2 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={isSaving || !formData.displayName.trim() || !formData.jobTitle.trim()}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? 'Salvataggio...' : staff ? 'Salva Modifiche' : 'Aggiungi'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { StaffFormModal };

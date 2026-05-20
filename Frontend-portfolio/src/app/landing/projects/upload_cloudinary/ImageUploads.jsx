// ============================================================================
// IMAGE UPLOADS — file picker + preview grid
// No upload logic here — files are held in useProjectFormUsecase and sent
// as multipart FormData when the project is saved.
// ============================================================================
import React, { useRef } from 'react';
import { Upload, X, Image } from '@core/constants/icons';

const MAX_MB = 5;

const Section = ({ title, hint, files, type, addFiles, removeFile }) => {
  const inputRef = useRef(null);

  const onFileChange = (e) => {
    if (e.target.files?.length) {
      addFiles(type, e.target.files);
      e.target.value = '';          // reset so same file can be re-added if removed
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-neutral-400 mt-0.5">{hint}</p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
        >
          <Upload size={13} />
          Add files
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      {files.length === 0 ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 h-28 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-primary-400 transition-colors"
        >
          <Image size={28} className="text-gray-300 dark:text-gray-600" />
          <p className="text-xs text-gray-400 dark:text-neutral-500">
            Click or drag images here (max {MAX_MB} MB each)
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {files.map((file, i) => (
            <div key={i} className="relative group aspect-square">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-700"
              />
              <button
                type="button"
                onClick={() => removeFile(type, i)}
                className="absolute top-1 right-1 p-0.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
              <p className="absolute bottom-0 left-0 right-0 text-[9px] text-white bg-black/50 text-center truncate px-1 rounded-b-lg">
                {file.name}
              </p>
            </div>
          ))}
          {/* Add more button */}
          <div
            onClick={() => inputRef.current?.click()}
            className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-400 transition-colors"
          >
            <Upload size={20} className="text-gray-400" />
          </div>
        </div>
      )}
    </div>
  );
};

const ImageUploads = ({ usecase }) => {
  const { coverImages, projectImages, addFiles, removeFile } = usecase;

  return (
    <div className="space-y-2">
      <Section
        title="Cover Images"
        hint="Main banner / thumbnail for the project card (max 10)"
        files={coverImages}
        type="cover"
        addFiles={addFiles}
        removeFile={removeFile}
      />
      <Section
        title="Project Screenshots"
        hint="Detailed screenshots or demo images (max 20)"
        files={projectImages}
        type="project"
        addFiles={addFiles}
        removeFile={removeFile}
      />
    </div>
  );
};

export default ImageUploads;

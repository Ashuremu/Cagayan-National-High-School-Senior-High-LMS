import { useRef, type ChangeEvent, type DragEvent } from 'react'

export type FileUploadItem = {
  id: string
  name: string
  size: number
}

export type FileUploadProps = {
  files: FileUploadItem[]
  onFilesAdd: (files: FileList | File[]) => void
  onFileRemove: (id: string) => void
  uploadLabel?: string
  filesLabel?: string
  accept?: string
  hint?: string
  multiple?: boolean
  emptyMessage?: string
  className?: string
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export const FileUpload = ({
  files,
  onFilesAdd,
  onFileRemove,
  uploadLabel = 'Upload Documents',
  filesLabel = 'Files Uploaded',
  accept = '.fig,.zip,.pdf,.png,.jpeg,.jpg',
  hint = 'fig, zip, pdf, png, jpeg',
  multiple = true,
  emptyMessage = 'No files uploaded yet.',
  className = '',
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      onFilesAdd(event.target.files)
      event.target.value = ''
    }
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files?.length) {
      onFilesAdd(event.dataTransfer.files)
    }
  }

  const openFilePicker = () => fileInputRef.current?.click()

  return (
    <div className={`file-upload ${className}`.trim()}>
      <section className="file-upload__section">
        <h3 className="file-upload__label">{uploadLabel}</h3>
        <div
          className="file-upload__dropzone"
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          onClick={openFilePicker}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              openFilePicker()
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={uploadLabel}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={accept}
            className="file-upload__input"
            onChange={handleFileInput}
          />
          <span className="file-upload__icon" aria-hidden="true">
            ↑
          </span>
          <p className="file-upload__text">
            Drag &amp; Drop or <strong>Choose file</strong> to upload
          </p>
          <p className="file-upload__hint">{hint}</p>
        </div>
      </section>

      <section className="file-upload__section">
        <h3 className="file-upload__label">{filesLabel}</h3>
        {files.length === 0 ? (
          <p className="file-upload__empty">{emptyMessage}</p>
        ) : (
          <ul className="file-upload__list">
            {files.map((file) => (
              <li key={file.id} className="file-upload__item">
                <span>
                  {file.name} ({formatFileSize(file.size)})
                </span>
                <button type="button" onClick={() => onFileRemove(file.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

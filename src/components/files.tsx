import { cn } from '@/lib/utils';
import Link from 'next/link'

export default function Files({
  files,
  id,
  selectedFile
}: {
  files: { id: string }[];
  id: string;
  selectedFile?: string;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="text-lg font-bold font-mono">Files</div>
      <div className="flex flex-col gap-1 p-1 w-full">
        {files.map(file => (
          <Link
            className={cn(
              "border px-2 py-1",
              {
                "bg-gray-300": file.id === selectedFile
              }
            )}
            key={file.id}
            href={`/${id}/${file.id}`}
          >
            <div>{file.id}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
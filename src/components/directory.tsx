import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Directory({
  label="Directories",
  dirs,
  selectedDir
}: {
  label?: string;
  dirs: { id: string; meta?: { tag?: string } }[];
  selectedDir: string;
}) {
  return (
    <div className="flex flex-col min-w-[200px] max-w-[200px] gap-1 p-1">

      <div className="text-lg font-bold font-mono">{label}</div>

      {dirs.map((dir) => (
        <Link
          className={cn("w-full border px-2 py-1 flex gap-1 items-center justify-between hover:bg-gray-100 transition-colors", {
            "bg-gray-300": dir.id === selectedDir
          })}
          key={dir.id}
          href={`/${dir.id}`}
        >
          <div>{dir.id}</div>
          <div className="text-sm">{dir.meta?.tag}</div>
        </Link>
      ))}

      {dirs.length === 0 && (
        <div className="text-gray-500 text-sm">No directories found.</div>
      )}
    </div>
  )
}
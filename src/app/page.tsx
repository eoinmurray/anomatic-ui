import Directory from "@/components/directory";
import getDirs from "@/lib/get-dirs";

export default function Home() {
  const dirs = getDirs();

  return (
    <div className="flex min-h-screen">
      <Directory dirs={dirs} />

      <div className="p-1 border-l flex flex-col w-full justify-center items-center">
        <div className="flex flex-col gap-2 mb-4">
        <div className="text-2xl font-mono font-bold">Anarchomatic Data Browser</div>
        <div>Select a directory from the sidebar to view its contents.</div>
        </div>
      </div>
    </div>
  );
}

import Directory from "@/components/directory";
import Files from "@/components/files";
import getAllFiles from "@/lib/get-all-files";
import getDirs from "@/lib/get-dirs";

export default async  function Page({ 
  params 
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const dirs = getDirs();
  const files = getAllFiles(id);

  return (
    <div className="flex min-h-screen">
      <Directory dirs={dirs} selectedDir={id} />

      <div className="p-1 border-l border-r min-w-[200px] max-w-[200px]">
        <Files files={files} id={id} />
      </div>
    </div>
  );
}
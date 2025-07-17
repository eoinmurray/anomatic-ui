import Sidebar from "@/components/directory";
import Files from "@/components/files";
import Render from "@/components/render";
import getAllFiles from "@/lib/get-all-files";
import getData from "@/lib/get-data";
import getDirs from "@/lib/get-dirs";

export default async function Page({
  params
}: {
  params: Promise<{ 
    id: string,
    filename: string
  }>
}) {
  const { id, filename } = await params;
  const dirs = getDirs();
  const files = getAllFiles(id);
  const data = getData(id, filename);

  return (
    <div className="flex min-h-screen">
      <Sidebar dirs={dirs} selectedDir={id}/>
      <div className="p-1 border-l min-w-[200px] max-w-[200px]">
        <Files files={files} id={id} selectedFile={filename} />
      </div>

      <div className="p-1 border-l w-full">
        <div className="text-xl font-mono font-bold">{filename}</div>
        <Render filename={filename} data={data} />
      </div>
    </div>
  );
}
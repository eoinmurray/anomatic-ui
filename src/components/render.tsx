import isTidy from "@/lib/is-tidy";
import ObjectRenderer from "./object-renderer";
import AutoPlot from "./auto-plot";

function makeSvgResponsive(svgString: string): string {
  return svgString
    .replace(/<svg([^>]*?)width="[^"]*"([^>]*?)height="[^"]*"([^>]*?)>/, '<svg$1$2$3 viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">')
}

export default function Render({
  filename,
  data
}: {
  filename: string,
  data: any
}) {
  let parsedData

  const isJSON = filename.endsWith('.json');
  if (isJSON) {
    parsedData = JSON.parse(data);
  } else {
    parsedData = data;
  }

  const isImage = filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.svg'); 
  const tidy = isJSON && isTidy(parsedData);

  return (
    <div>
      {!isImage && !tidy && (
        <ObjectRenderer
          data={parsedData}
        />
      )}

      {!isImage && tidy && (
        <AutoPlot
          data={parsedData}
        />
      )}

      {isImage && (
        <div>
          <div
            style={{ 
              width: "800px", 
              height: "auto",
              display: "block"
            }}
            dangerouslySetInnerHTML={{ __html: makeSvgResponsive(data) }}
          />
        </div>
      )}
      
    </div>
  );
}
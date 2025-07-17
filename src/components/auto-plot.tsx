
import isTidy from "@/lib/is-tidy";
import getPlotType from "@/plots/get-plot-type"; 
import Raster from "@/plots/raster";
import Line from "@/plots/line";
import ObjectRenderer from "./object-renderer";

export default function AutoPlot({
  data
}: {
  data: any
}) {
  if (!isTidy(data)) {
    return <div>Data is not in tidy format</div>;
  }

  const plotType = getPlotType(data);

  let plot = <Line data={data} />

  if (plotType && plotType.type === 'raster') {
    plot = <Raster data={data} />;
  }

  return (
    <div>
      {plot}

      {data.length <= 1000 && <ObjectRenderer data={data} />}
      {data.length > 1000 && <div>Data is too large to render as an object</div>}
    </div>
  );
}
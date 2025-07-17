'use client';
import * as Plot from "@observablehq/plot";
import PlotComponent from "@/components/plot-component";

export default function Raster({
  data
}: {
  data: any
}) {
  return (
    <div>
      <PlotComponent
        width={1000}
        inset={0}
        y={{
          tickFormat: (d: any, i: number) => i % 5 === 0 ? d.toFixed(2) : "",
        }}
        x={{
          tickFormat: (d: any, i: number) => i % 5 === 0 ? d.toFixed(2) : "",
        }}
        marks={[
          Plot.frame(),
          Plot.dot(data, {
            x: "spike_times",
            y: "neuron_id",
            fill: "neuron_type",
            r: 1,
          })
        ]}
      />
    </div>
  );

}
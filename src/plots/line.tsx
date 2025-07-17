'use client';
import * as Plot from "@observablehq/plot";
import PlotComponent from "@/components/plot-component";

export default function Line({
  data
}: {
  data: any
}) {

  const keys = Object.keys(data[0])
  const [first, ...rest] = keys;

  return (
    <div>
      <PlotComponent
        width={1000}
        marginLeft={50}
        y={{
          tickFormat: (d: any) => d.toFixed(2),
          domain: [0, 1.5*Math.max(...data.map((d: any) => Math.max(...rest.map((key: string) => d[key]))))],
        }}
        marks={[
          Plot.frame(),
          rest.map((key: string, index: number) =>
            Plot.line(data, {
              x: first, 
              y: key, 
              stroke: index === 0 ? "black" : "red",
            })
          )
        ]}
      />
    </div>
  );

}
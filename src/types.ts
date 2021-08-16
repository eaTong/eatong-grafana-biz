// type SeriesSize = 'sm' | 'md' | 'lg';
// export type GeomType = 'point' | 'path' | 'line' | 'area' | 'interval' | 'polygon' | 'edge' | 'schema' | 'heatmap' | 'pointStack' | 'pointJitter' | 'pointDodge' | 'intervalStack' | 'intervalDodge' | 'intervalSymmetric' | 'lineStack' | 'areaStack' | 'schemaDodge';
// import {LengendOptions} from 'bizcharts/lib/plots/core/interface';
type LegendPosition =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'right'
  | 'right-top'
  | 'right-bottom'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | undefined;

export interface BizOptions {
  showLegend: boolean;
  legendPosition: LegendPosition;
  showLine: boolean;
  showPoint: boolean;
  showArea: boolean;
  showInterval: boolean;
  line: {
    color: string;
    xField: string;
    yField: string;
    shape: string;
    groupField: string;
    drillDown: string;
  };
  interval: {
    color: string;
    xField: string;
    yField: string;
    shape: string;
    groupField: string;
    drillDown: string;
    showAsPie: boolean;
    showAsRow: boolean;
    labelOffset: number;
    innerRadius: number;
    autoGroup: boolean;
  };
  point: {
    color: string;
    xField: string;
    yField: string;
    shape: string;
    groupField: string;
    drillDown: string;
  };
  area: {
    color: string;
    xField: string;
    yField: string;
    shape: string;
    groupField: string;
    drillDown: string;
  };
  // config: BizConfig
  // showSeriesCount: boolean;
  // seriesCountSize: SeriesSize;
}

export interface BizConfig {
  // xField: string;
  // yField: string;
  // color: string;
  // shape: string;
}

import React from 'react';
import {PanelData, PanelProps} from '@grafana/data';
import {BizOptions} from 'types';
import {css, cx} from 'emotion';
import {Chart, Interval, LineAdvance, Point, Area, Coordinate, useTheme, Legend} from 'bizcharts';
import {stylesFactory} from '@grafana/ui';
import {getLocationSrv} from '@grafana/runtime';
import {IIntervalGemoProps} from 'bizcharts/lib/geometry/Interval';
import DataSet from "@antv/data-set";

interface Props extends PanelProps<BizOptions> {
}

interface DynamicObject {
  [key: string]: any;
}

function getData(data: PanelData, options: BizOptions) {
  const resultData = [];
  const serie = data.series[0];
  const fields = new Array<string>();
  if (serie && serie.length) {
    for (let i = 0; i < serie.length; i++) {
      const resultMapping: DynamicObject = {};
      serie.fields.forEach(item => {
        if (fields.indexOf(item.name) === -1) {
          fields.push(item.name);
        }
        resultMapping[item.name] = item.values.get(i);
      });
      resultData.push(resultMapping);
    }
  }
  if (options.interval.autoGroup) {
    const {DataView} = DataSet;
    const dv = new DataView();
    dv.source(resultData)
      .transform({
        type: "fold",
        fields: fields.filter(item => item !== options.interval.xField),
        key: "bizGroupField",
        value: options.interval.yField,
        retains: [options.interval.xField, options.line.yField]
      })
    return dv.rows;
  }

  return resultData;
}

function onClickPanel(event: any, options: BizOptions) {
  if (event.data?.data) {
    const originData = event.data.data;
    if (options.interval.drillDown) {
      getLocationSrv().update({
        query: {
          'var-service': originData[options.interval.drillDown],
        },
        partial: true,
        replace: true,
      });
    }
  }
}

export const BizPanel: React.FC<Props> = ({options, data, width, height}) => {
  const styles = getStyles();

  function getIntervalOptions() {
    const intervalOptions: IIntervalGemoProps = {
      position: options.interval.showAsPie
        ? options.interval.yField
        : `${options.interval.xField}*${options.interval.yField}`,
      color: options.interval.showAsPie
        ? options.interval.xField
        : (options.interval.autoGroup ? options.interval.groupField : options.interval.color),
    };
    if (options.interval.showAsPie) {
      intervalOptions.adjust = 'stack';
      if (options.interval.labelOffset >= 0) {
        intervalOptions.label = [options.interval.xField, {offset: options.interval.labelOffset}];
      }
    } else {
      intervalOptions.adjust = [{type: 'dodge', marginRatio: 0}];
      intervalOptions.shape = options.interval.shape;
    }
    return intervalOptions;
  }

  const [theme] = useTheme('light');
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <Chart
        theme={theme}
        height={height}
        width={width}
        data={getData(data, options)}
        onClick={(event: MouseEvent) => onClickPanel(event, options)}
        padding={options.interval.showAsPie ? options.interval.labelOffset : 40}
      >
        <Legend visible={options.showLegend} position={options.legendPosition}/>
        {options.showLine && (
          <LineAdvance
            position={`${options.line.xField}*${options.line.yField}`}
            color={options.line.groupField || options.line.color}
            shape={options.line.shape}
          />
        )}
        {options.showInterval && (
          <>
            {options.interval.showAsPie && <Coordinate type="theta" innerRadius={options.interval.innerRadius}/>}
            {options.interval.showAsRow && <Coordinate transpose/>}
            <Interval {...getIntervalOptions()} />
          </>
        )}
        {options.showPoint && (
          <Point
            position={`${options.point.xField}*${options.point.yField}`}
            color={options.point.groupField || options.point.color}
            adjust={options.point.groupField ? [{type: 'dodge', marginRatio: 0}] : []}
            shape={options.point.shape}
          />
        )}
        {options.showArea && (
          <Area
            position={`${options.area.xField}*${options.area.yField}`}
            color={options.area.groupField || options.area.color}
            adjust={options.area.groupField ? [{type: 'dodge', marginRatio: 0}] : []}
            shape={options.area.shape}
          />
        )}

        {/*<ColumnChart data={getData(data)} yField={'value'} xField={'materic'}/>*/}
      </Chart>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});

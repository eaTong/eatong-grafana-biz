import {FieldOverrideContext, getFieldDisplayName, PanelPlugin} from '@grafana/data';
import {BizOptions} from './types';
import {BizPanel} from './BizPanel';

export const plugin = new PanelPlugin<BizOptions>(BizPanel).setPanelOptions(builder => {
  // 添加折线图配置
  builder
    .addBooleanSwitch({
      path: 'showLegend',
      name: '显示图例',
      defaultValue: true,
    })
    .addSelect({
      path: 'legendPosition',
      name: '图例位置',
      defaultValue: 'bottom',
      settings: {
        options:[
          {label:'左' , value:'left'},
          {label:'左上' , value:'left-top'},
          {label:'左下' , value:'left-bottom'},
          {label:'右' , value:'right'},
          {label:'右上' , value:'right-top'},
          {label:'右下' , value:'right-bottom'},
          {label:'上' , value:'top'},
          {label:'上左' , value:'top-left'},
          {label:'上右' , value:'top-right'},
          {label:'下' , value:'bottom'},
          {label:'下左' , value:'bottom-left'},
          {label:'下右' , value:'bottom-right'},
        ]
      }
    })
    .addBooleanSwitch({
      path: 'showLine',
      name: '显示折线图',
      defaultValue: true,
    })
    .addColorPicker({
      path: 'line.color',
      name: '颜色',
      defaultValue: '',
      showIf: opts => opts.showLine,
    })
    .addSelect({
      path: 'line.xField',
      name: '纬度字段',
      defaultValue: 'metric',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: (context: FieldOverrideContext) => getFieldsOptions(context, false),
      },
      showIf: opts => opts.showLine,
    })
    .addSelect({
      path: 'line.yField',
      name: '指标字段',
      defaultValue: 'value',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: (context: FieldOverrideContext) => getFieldsOptions(context, false),
      },
      showIf: (opts: BizOptions) => opts.showLine,
    })
    .addSelect({
      path: 'line.groupField',
      name: '数据分组字段',
      defaultValue: '',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: (context: FieldOverrideContext) => getFieldsOptions(context, true),
      },
      showIf: (opts: BizOptions) => opts.showLine,
    })
    .addSelect({
      path: 'line.shape',
      name: '显示类型',
      defaultValue: 'line',
      settings: {
        allowCustomValue: true,
        options: getShapeOptions('line'),
      },
      showIf: (opts: BizOptions) => opts.showLine,
    });

  // 添加柱状图配置
  builder
    .addBooleanSwitch({
      path: 'showInterval',
      name: '显示柱状图',
      defaultValue: false
    })
    .addColorPicker({
      path: 'interval.color',
      name: '柱状图颜色',
      defaultValue: '',
      showIf: (opts: BizOptions) => opts.showInterval && !opts.interval.autoGroup,
    })
    .addBooleanSwitch({
      path: 'interval.showAsPie',
      name: '显示为饼图',
      defaultValue: false,
      showIf: (opts: BizOptions) => opts.showInterval && !opts.interval.showAsRow,
    })
    .addBooleanSwitch({
      path: 'interval.showAsRow',
      name: '显示为条形图',
      defaultValue: false,
      showIf: (opts: BizOptions) => opts.showInterval && !opts.interval.showAsPie,
    })
    .addBooleanSwitch({
      path: 'interval.autoGroup',
      name: '自动聚合数据',
      defaultValue: false,
      showIf: (opts: BizOptions) => opts.showInterval,
    })
    .addNumberInput({
      path: 'interval.innerRadius',
      name: '空心半径',
      defaultValue: 0.75,
      settings: {
        min: 0,
        max: 1,
        step: 0.05,
        integer: false,
      },
      showIf: (opts: BizOptions) => opts.showInterval && opts.interval.showAsPie,
    })
    .addNumberInput({
      path: 'interval.labelOffset',
      name: '文本偏移量',
      description: '显示文字与图形间的距离，小于0则不显示',
      defaultValue: -1,
      settings: {
        min: -1,
        max: 100,
        step: 1,
        integer: true,
      },
      showIf: (opts: BizOptions) => opts.showInterval && opts.interval.showAsPie,
    })
    .addSelect({
      path: 'interval.xField',
      name: '柱状图纬度字段',
      defaultValue: 'metric',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: (context: FieldOverrideContext) => getFieldsOptions(context, false),
      },
      showIf: opts => opts.showInterval,
    })
    .addSelect({
      path: 'interval.yField',
      name: '柱状图指标字段',
      defaultValue: 'value',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: (context: FieldOverrideContext) => getFieldsOptions(context, false),
      },
      showIf: (opts: BizOptions) => opts.showInterval,
    })
    .addSelect({
      path: 'interval.groupField',
      name: '柱状图数据分组字段',
      defaultValue: '',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: (context: FieldOverrideContext) => getFieldsOptions(context, true),
      },
      showIf: (opts: BizOptions) => opts.showInterval && opts.interval.autoGroup,
    })
    .addSelect({
      path: 'interval.drillDown',
      name: '柱状图下钻字段',
      defaultValue: '',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: (context: FieldOverrideContext) => getFieldsOptions(context, true),
      },
      showIf: (opts: BizOptions) => opts.showInterval,
    })
    .addSelect({
      path: 'interval.shape',
      name: '柱状图显示类型',
      defaultValue: 'rect',
      settings: {
        allowCustomValue: true,
        options: getShapeOptions('interval'),
      },
      showIf: (opts: BizOptions) => opts.showInterval,
    });
  // 添加点图配置
  builder
    .addBooleanSwitch({
      path: 'showPoint',
      name: '显示点图',
      defaultValue: false,
    })
    .addColorPicker({
      path: 'point.color',
      name: '点图颜色',
      defaultValue: '',
      showIf: (opts: BizOptions) => opts.showPoint,
    })
    .addSelect({
      path: 'point.xField',
      name: '点图纬度字段',
      defaultValue: 'metric',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: (context: FieldOverrideContext) => getFieldsOptions(context, false),
      },
      showIf: opts => opts.showPoint,
    })
    .addSelect({
      path: 'point.yField',
      name: '点图指标字段',
      defaultValue: 'value',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: (context: FieldOverrideContext) => getFieldsOptions(context, false),
      },
      showIf: (opts: BizOptions) => opts.showPoint,
    })
    .addSelect({
      path: 'point.groupField',
      name: '点图数据分组字段',
      defaultValue: '',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: (context: FieldOverrideContext) => getFieldsOptions(context, true),
      },
      showIf: (opts: BizOptions) => opts.showPoint,
    })
    .addSelect({
      path: 'point.shape',
      name: '点图显示类型',
      defaultValue: 'circle',
      settings: {
        allowCustomValue: true,
        options: getShapeOptions('point'),
      },
      showIf: (opts: BizOptions) => opts.showPoint,
    });

  // 添加区域图配置
  builder
    .addBooleanSwitch({
      path: 'showArea',
      name: '显示区域图',
      defaultValue: false,
    })
    .addColorPicker({
      path: 'area.color',
      name: '区域图颜色',
      defaultValue: '',
      showIf: (opts: BizOptions) => opts.showArea,
    })
    .addSelect({
      path: 'area.xField',
      name: '区域图纬度字段',
      defaultValue: 'metric',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: (context: FieldOverrideContext) => getFieldsOptions(context, false),
      },
      showIf: opts => opts.showArea,
    })
    .addSelect({
      path: 'area.yField',
      name: '区域图指标字段',
      defaultValue: 'value',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: (context: FieldOverrideContext) => getFieldsOptions(context, false),
      },
      showIf: (opts: BizOptions) => opts.showArea,
    })
    .addSelect({
      path: 'area.groupField',
      name: '区域图数据分组字段',
      defaultValue: '',
      settings: {
        allowCustomValue: true,
        options: [],
        getOptions: (context: FieldOverrideContext) => getFieldsOptions(context, true),
      },
      showIf: (opts: BizOptions) => opts.showArea,
    })
    .addSelect({
      path: 'area.shape',
      name: '区域图显示类型',
      defaultValue: 'area',
      settings: {
        allowCustomValue: true,
        options: getShapeOptions('area'),
      },
      showIf: (opts: BizOptions) => opts.showArea,
    });

  return builder;
});

function getShapeOptions(optionType: string) {
  const pointOptions = [
    {label: 'circle', value: 'circle'},
    {label: 'square', value: 'square'},
    {label: 'bowtie', value: 'bowtie'},
    {label: 'diamond', value: 'diamond'},
    {label: 'hexagon', value: 'hexagon'},
    {label: 'triangle', value: 'triangle'},
    {label: 'triangle-down', value: 'triangle-down'},
    {label: 'hollowCircle', value: 'hollowCircle'},
    {label: 'hollowSquare', value: 'hollowSquare'},
    {label: 'hollowBowtie', value: 'hollowBowtie'},
    {label: 'hollowDiamond', value: 'hollowDiamond'},
    {label: 'hollowTriangle', value: 'hollowTriangle'},
    {label: 'hollowTriangle-down', value: 'hollowTriangle-down'},
    {label: 'cross', value: 'cross'},
    {label: 'tick', value: 'tick'},
    {label: 'plus', value: 'plus'},
    {label: 'hyphen', value: 'hyphen'},
  ];
  const lineOptions = [
    {label: 'line', value: 'line'},
    {label: 'dot', value: 'dot'},
    {label: 'dash', value: 'dash'},
    {label: 'smooth', value: 'smooth'},
    {label: 'hv', value: 'hv'},
    {label: 'vh', value: 'vh'},
    {label: 'hvh', value: 'hvh'},
    {label: 'vhv', value: 'vhv'},
    {label: 'hv', value: 'hv'},
    {label: 'hvh', value: 'hvh'},
  ];
  const areaOptions = [
    {label: 'area', value: 'area'},
    {label: 'smooth', value: 'smooth'},
    {label: 'line', value: 'line'},
    {label: 'smooth-line', value: 'smooth-line'},
  ];
  const intervalOptions = [
    {label: 'rect', value: 'rect'},
    {label: 'hollow-rect', value: 'hollow-rect'},
    {label: 'line', value: 'line'},
    {label: 'tick', value: 'tick'},
    {label: 'funnel', value: 'funnel'},
    {label: 'pyramid', value: 'pyramid'},
  ];
  if (optionType === 'point') {
    return pointOptions;
  } else if (optionType === 'line') {
    return lineOptions;
  } else if (optionType === 'area') {
    return areaOptions;
  } else if (optionType === 'interval') {
    return intervalOptions;
  }
  return [];
}

async function getFieldsOptions(context: FieldOverrideContext, enableNull?: boolean) {
  console.log(context);
  const options = enableNull ? [{value: '', label: '置空'}] : [];
  if (context.options.interval.autoGroup) {
    options.push({value: 'bizGroupField', label: '自动聚合字段'});
  }
  if (context && context.data) {
    for (const frame of context.data) {
      for (const field of frame.fields) {
        const name = getFieldDisplayName(field, frame, context.data);
        // const value = `/^${escapeStringForRegex(name)}$/`;
        options.push({value: name, label: name});
      }
    }
  }
  return Promise.resolve(options);
}

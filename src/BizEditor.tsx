import React from 'react';
import { StandardEditorProps } from '@grafana/data';
// import {Button} from "@grafana/ui";
import { BizConfig } from './types';

export const BizEditor: React.FC<StandardEditorProps<BizConfig>> = props => {
  // const {value , onChange } = props;
  return <div>{JSON.stringify(props)}</div>;
};

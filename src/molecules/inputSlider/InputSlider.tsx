import { InputNumber, Slider } from 'antd';
import React from 'react';
import { Column } from '../../pages/layout';

interface IInputSliderProps {
  onChangeSlider?: (value: number) => void;
  numberValue?: number;
  minValue?: number;
  maxValue?: number;
  name?: string | undefined;
  id?: string;
}

const InputSlider: React.FC<IInputSliderProps> = ({
  onChangeSlider,
  numberValue,
  minValue,
  maxValue,
  name,
  id,
}) => {
  return (
    <Column>
      <InputNumber
        min={minValue ?? 0}
        max={maxValue ?? 0}
        value={numberValue}
        onChange={onChangeSlider}
        size='large'
        name={name}
        id={id}
      />
      <Slider
        id={id}
        min={minValue ?? 0}
        max={maxValue ?? 0}
        onChange={onChangeSlider}
        value={numberValue ?? 0}
      />
    </Column>
  );
};

export default InputSlider;

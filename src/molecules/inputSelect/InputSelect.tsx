import React from 'react';
import { Select, SelectProps } from 'antd';
import styles from './inputSelect.module.less';

const { Option } = Select;

interface IInputSelectProps extends SelectProps {
  dataSelect?: { value: string; text: string }[];
}

const InputSelect: React.FC<IInputSelectProps> = ({
  dataSelect = [],

  ...rest
}) => {
  return (
    <Select
      defaultActiveFirstOption={false}
      showArrow={true}
      filterOption={false}
      className={styles.inputSelect}
      size='large'
      {...rest}
    >
      {dataSelect.map((d) => (
        <Option key={d.value}>{d.text}</Option>
      ))}
      ;
    </Select>
  );
};

export default InputSelect;

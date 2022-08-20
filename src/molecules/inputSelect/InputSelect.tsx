import React from 'react';
import { Select, SelectProps } from 'antd';
import styles from './inputSelect.module.less';

const { Option } = Select;

interface IInputSelectProps extends SelectProps {
  dataSelect?: { value: string; text: string }[];
  id?: string;
}

const InputSelect: React.FC<IInputSelectProps> = ({
  dataSelect = [],
  id,
  ...rest
}) => {
  return (
    <Select
      defaultActiveFirstOption={false}
      showArrow={true}
      filterOption={false}
      className={styles.inputSelect}
      size='large'
      id={id}
      {...rest}
    >
      {dataSelect.map((d) => (
        <Option id={`${id}-option-${d.text}`} key={d.value}>
          {d.text}
        </Option>
      ))}
      ;
    </Select>
  );
};

export default InputSelect;

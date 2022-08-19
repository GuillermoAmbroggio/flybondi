import React from 'react';
import { Button as AntdButton, ButtonProps } from 'antd';

interface IButtonProps extends ButtonProps {
  text: string;
  type?:
    | 'link'
    | 'text'
    | 'ghost'
    | 'default'
    | 'primary'
    | 'dashed'
    | undefined;
  style?: React.CSSProperties;
}

const Button: React.FC<IButtonProps> = ({
  text,
  type: typeProps = 'primary',
  style,
  ...rest
}) => {
  return (
    <AntdButton
      {...rest}
      shape='round'
      type={typeProps}
      size='large'
      style={{
        color: typeProps === 'primary' ? '#182329' : undefined,
        ...style,
      }}
    >
      {text}
    </AntdButton>
  );
};

export default Button;

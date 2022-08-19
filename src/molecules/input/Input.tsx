/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Text } from '../../atoms';
import { Column, Flex } from '../../pages/layout';
import styles from './input.module.scss';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

interface IInputProps extends React.ComponentPropsWithoutRef<'input'> {
  messagge?: string;
  status?: 'success' | 'error';
  classNameInput?: string;
  classNameContainer?: string;
}

interface IInputPropsSubComponent {
  Password: React.FC<IInputProps>;
}

const Password: React.FC<IInputProps> = ({
  status,
  messagge,
  classNameContainer,
  classNameInput,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <Column>
      <Flex
        alignItems={'center'}
        className={`${styles.inputStylePasswordContainer} ${classNameContainer}`}
      >
        <input
          className={`${styles.inputStylePassword} ${classNameInput}`}
          {...rest}
          type={visible ? 'text' : 'password'}
        />
        {visible ? (
          <EyeOutlined onClick={() => setVisible(false)} />
        ) : (
          <EyeInvisibleOutlined onClick={() => setVisible(true)} />
        )}
      </Flex>
      {messagge ? (
        <Text
          className={styles.containerMessage}
          color={status === 'success' ? 'success' : 'error'}
        >
          {messagge}
        </Text>
      ) : null}
    </Column>
  );
};

const Input: React.FC<IInputProps> & IInputPropsSubComponent = ({
  status,
  messagge,
  classNameContainer,
  classNameInput,
  ...rest
}) => {
  return (
    <div className={classNameContainer}>
      <input className={`${styles.inputStyle} ${classNameInput}`} {...rest} />
      {messagge ? (
        <Text
          className={styles.containerMessage}
          color={status === 'success' ? 'success' : 'error'}
        >
          {messagge}
        </Text>
      ) : null}
    </div>
  );
};

Input.Password = Password;
export default Input;

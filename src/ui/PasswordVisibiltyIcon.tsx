import colors from '@utils/colors';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

interface Props {
  privateIcon: boolean;
}

const PasswordVisibiltyIcon: FC<Props> = ({privateIcon}) => {
  return privateIcon ? (
    <Icon name="eye" color={colors.SECONDARY} size={16} />
  ) : (
    <Icon name="eye-with-line" color={colors.SECONDARY} size={16} />
  );
};

export default PasswordVisibiltyIcon;

const styles = StyleSheet.create({
  container: {},
});

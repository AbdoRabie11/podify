import colors from '@utils/colors';
import React, {FC} from 'react';
import {FlexStyle, StyleSheet, View} from 'react-native';

interface Props {
  size: number;
  postion: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const CircleUi: FC<Props> = ({size, postion}) => {
  let viewPostion: FlexStyle = {};

  switch (postion) {
    case 'top-left':
      viewPostion = {top: -size / 2, left: -size / 2};
      break;
    case 'top-right':
      viewPostion = {top: -size / 2, right: -size / 2};
      break;
    case 'bottom-right':
      viewPostion = {bottom: -size / 2, right: -size / 2};
      break;
    case 'bottom-left':
      viewPostion = {bottom: -size / 2, left: -size / 2};
  }

  return (
    <View
      style={{
        height: size,
        width: size,
        position: 'absolute',
        ...viewPostion,
      }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.SECONDARY,
          opacity: 0.3,
        }}
      />

      <View
        style={{
          width: size / 1.5,
          height: size / 1.5,
          borderRadius: size / 2,
          backgroundColor: colors.SECONDARY,
          //     opacity: 0.2,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [{translateX: -size / 3}, {translateY: -size / 3}],
        }}
      />
    </View>
  );
};

export default CircleUi;

const styles = StyleSheet.create({
  container: {},
});

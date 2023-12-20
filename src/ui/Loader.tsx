import colors from '@utils/colors';
import React, {FC, useEffect} from 'react';
import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';
interface Props {}

const Loader: FC<Props> = props => {
  const initalRotation = useSharedValue(0);

  const transform = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${initalRotation.value}deg`}],
    };
  });

  useEffect(() => {
    initalRotation.value = withRepeat(withTiming(360), -1);
  }, []);

  return (
    <Animated.View style={transform}>
      <Icon name="loading1" size={24} color={colors.CONTRAST} />
    </Animated.View>
  );
};

export default Loader;

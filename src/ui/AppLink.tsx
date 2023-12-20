import colors from '@utils/colors';
import React, {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface Props {
  title: string;
  onPress?(): void;
  active?: boolean;
}

const AppLink: FC<Props> = ({title, onPress, active = true}) => {
  return (
    <Pressable style={{opacity:active ? 1 : 0.4}} onPress={active ? onPress : null}>
      <Text style={styles.title}> {title} </Text>
    </Pressable>
  );
};

export default AppLink;

const styles = StyleSheet.create({
  container: {},
  title: {
    color: colors.SECONDARY,
  },
});

import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {}

const Test: FC<Props> = (props) => {
 return <View style={styles.container}></View>;
};

export default Test;

const styles = StyleSheet.create({
  container: {},
});

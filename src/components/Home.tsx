import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '@utils/colors';

interface Props {}

const Home: FC<Props> = props => {
  return <View style={styles.container}>
    <Text>Hello owlrd</Text>
  </View>;
};

export default Home;

const styles = StyleSheet.create({
  container: {},
});

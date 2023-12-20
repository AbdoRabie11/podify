import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

const Home: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
});

import React, {FC} from 'react';
import { Text } from 'react-native';
import {StyleSheet, View} from 'react-native';

interface Props {}

const Profile: FC<Props> = (props) => {
 return <View style={styles.container}>
  <Text>Profile screen</Text>
 </View>;
};

export default Profile;

const styles = StyleSheet.create({
  container: {},
});

import CircleUi from '@ui/CircleUi';
import colors from '@utils/colors';
import React, {FC, ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
  children: ReactNode;
  heading?: string;
  subHeading?: string;
}

const AuthFormContainer: FC<Props> = ({children,heading, subHeading}) => {
  return (
    <View style={styles.container}>
      <CircleUi postion="top-left" size={200} />
      <CircleUi postion="top-right" size={100} />

      <CircleUi postion="bottom-left" size={200} />
      <CircleUi postion="bottom-right" size={200} />

      <View style={styles.headerContainer}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </View>
      {children}
    </View>
  );
};

export default AuthFormContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: colors.SECONDARY,
    fontSize: 25,
    fontWeight: 'bold',
  },
  subHeading: {
    color: colors.CONTRAST,
    fontSize: 16,
  },
  headerContainer: {
    width: '100%',
    padding: 15,
    marginBottom: 20,
  },
});

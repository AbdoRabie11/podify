import colors from '@utils/colors';
import React, {FC, useRef, forwardRef} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';

interface Props extends TextInputProps {
  ref: any;
}

const OTPfiled: FC<Props> = forwardRef<TextInput, Props>((props, ref) => {
  return (
    <TextInput {...props} ref={ref} style={[styles.input, props.style]} />
  );
});

export default OTPfiled;

const styles = StyleSheet.create({
  container: {},
  input: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: colors.SECONDARY,
    borderWidth: 2,
    textAlign: 'center',
    color: colors.CONTRAST,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 0,
  },
});

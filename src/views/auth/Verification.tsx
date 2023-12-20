import AuthInputField from '@components/AuthInputField';
import AppInput from '@ui/AppInput';
import colors from '@utils/colors';
import {Formik, useFormikContext} from 'formik';
import React, {FC, useEffect, useRef, useState} from 'react';
import * as Yup from 'yup';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Button,
  Image,
  Keyboard,
} from 'react-native';
import Form from '@components/form';
import SubmitBtn from '@components/form/SubmitBtn';
import Icon from 'react-native-vector-icons/Entypo';
import PasswordVisibiltyIcon from '@ui/PasswordVisibiltyIcon';
import AppLink from '@ui/AppLink';
import CircleUi from '@ui/CircleUi';
import AuthFormContainer from '@components/form/AuthFormContainer';
import OTPfiled from '@ui/OTPfiled';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthSatckParamList} from 'src/@types/navigation';
import AppButton from '@ui/AppButton';
import client from 'src/api/client';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Props = NativeStackScreenProps<AuthSatckParamList, 'verification'>;

const initialValues = {
  email: '',
};

const signupSchema = Yup.object({
  email: Yup.string()
    .trim('Email is missing')
    .email('Invalid email')
    .required('email is required'),
});

const otpFileds = new Array(6).fill('');

const Verification: FC<Props> = ({route}) => {
  const inputRef = useRef<TextInput>(null);
  const [otp, setOtp] = useState([...otpFileds]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [submiting, setSubmiting] = useState(false);
  const [countDown, setCountDown] = useState(30);
  const [canSend, setCanSend] = useState(false);

  const {userInfo} = route.params;
  const {navigate} = useNavigation<NavigationProp<AuthSatckParamList>>();
  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];

    if (value === 'Backspace') {
      // moves to the previous only if the field is empty
      if (!newOtp[index]) setActiveOtpIndex(index - 1);
      newOtp[index] = '';
    } else {
      // update otp and move to the next
      setActiveOtpIndex(index + 1);
      newOtp[index] = value;
    }

    setOtp([...newOtp]);
  };

  const handlePaste = (value: string) => {
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split('');
      setOtp([...newOtp]);
    }
  };

  const isValidOtp = otp.every(value => {
    return value.trim();
  });

  const handleSubmit = async () => {
    if (!isValidOtp) return;
    setSubmiting(true);
    try {
      const {data} = await client.post('/auth/verify-email', {
        userId: userInfo.id,
        token: otp.join(''),
      });
      console.log(data);
      navigate('signIn');
    } catch (error) {
      console.log(error);
    }
    setSubmiting(false);
  };

  const requestOtp = async () => {
    setCountDown(30);
    setCanSend(false);
    try {
      await client.post('/auth/re-verify-email', {userId: userInfo.id});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (canSend) return;

    const intervalId = setInterval(() => {
      setCountDown(oldCount => {
        if (oldCount <= 0) {
          setCanSend(true);
          clearInterval(intervalId);
          return 0;
        }
        return oldCount - 1;
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [canSend]);

  return (
    <Form
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={values => {
        console.log(values);
      }}>
      <AuthFormContainer
        heading="Verify Email"
        subHeading="Please look at your email.">
        <View style={styles.formContainer}>
          <View style={styles.inputContianer}>
            {otpFileds.map((_, i) => (
              <OTPfiled
                key={i}
                ref={activeOtpIndex === i ? inputRef : null}
                placeholder="*"
                onKeyPress={({nativeEvent}) => {
                  handleChange(nativeEvent.key, i);
                }}
                keyboardType="numeric"
                onChangeText={handlePaste}
                value={otp[i] || ''}
              />
            ))}
          </View>

          <AppButton busy={submiting} title="Submit" onPress={handleSubmit} />
          <View style={styles.linkContainer}>
            {countDown > 0 ? (
              <Text style={{color: colors.SECONDARY}}> {countDown} sec </Text>
            ) : null}

            <AppLink title="Resend-otp" active={canSend} onPress={requestOtp} />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },

  formContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    marginTop: 15,
    width: '100%',
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  inputContianer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
});

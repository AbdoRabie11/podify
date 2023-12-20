import AuthInputField from '@components/AuthInputField';
import AppInput from '@ui/AppInput';
import colors from '@utils/colors';
import {Formik, FormikHelpers, useFormikContext} from 'formik';
import React, {FC, useState} from 'react';
import * as Yup from 'yup';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Button,
  Image,
} from 'react-native';
import Form from '@components/form';
import SubmitBtn from '@components/form/SubmitBtn';
import Icon from 'react-native-vector-icons/Entypo';
import PasswordVisibiltyIcon from '@ui/PasswordVisibiltyIcon';
import AppLink from '@ui/AppLink';
import CircleUi from '@ui/CircleUi';
import AuthFormContainer from '@components/form/AuthFormContainer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthSatckParamList } from 'src/@types/navigation';
import client from 'src/api/client';
interface Props {}

const initialValues = {
  email: '',
};

interface InitialValues  {
  email: string;
}

const signupSchema = Yup.object({
  email: Yup.string()
    .trim('Email is missing')
    .email('Invalid email')
    .required('email is required'),
});

const LostPassword: FC<Props> = props => {
  const {navigate} = useNavigation<NavigationProp<AuthSatckParamList>>();


  const handleSubmit = async (
    values: InitialValues,
    actions: FormikHelpers<InitialValues>,
  ) => {
    actions.setSubmitting(true)
    try {
      const {data} = await client.post('/auth/forget-password', {
        ...values
      });
      console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }
    actions.setSubmitting(false)
  };


  return (
    <Form
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}>
      <AuthFormContainer
        heading="Forget Password"
        subHeading="Oops, did you forget your password? Don't worry, we'll help you get back in.">
        <View style={styles.formContainer}>
          <AuthInputField
            name="email"
            placeholder="john@gmail.com"
            label="Email"
            containerStyle={styles.marginBottom}
          />

          <SubmitBtn title="Send Link" />
          <View style={styles.linkContainer}>
            <AppLink title="Sign In" onPress={() => {
                navigate('signIn');
              }} />
            <AppLink title="Sign Up" onPress={() => {
                navigate('signUp');
              }} />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

export default LostPassword;

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
});

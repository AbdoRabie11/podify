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
import {NavigationProp, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import client from 'src/api/client';
import {AuthSatckParamList} from 'src/@types/navigation';

interface Props {}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

export interface NewUser {
  id?: string;
  name: string;
  email: string;
  password: string;
}

const signupSchema = Yup.object({
  name: Yup.string()
    .trim('Name is missing')
    .min(3, 'invalid name')
    .required('Name is required'),
  email: Yup.string()
    .trim('Email is missing')
    .email('Invalid email')
    .required('email is required'),
  password: Yup.string()
    .trim('password is missing')
    .min(4, 'password is to short')
    // .matches(
    //   /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
    //   'password  is too simple',
    // )
    .required('password is required'),
});

const SignUp: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [secureEntry, setSecureEntry] = useState(true);
  const {navigate} = useNavigation<NavigationProp<AuthSatckParamList>>();

  const handleSubmit = async (
    values: NewUser,
    actions: FormikHelpers<NewUser>,
  ) => {
    actions.setSubmitting(true)
    try {
      const {data} = await client.post('/auth/create', {
        ...values,
      });
      navigate('verification', {userInfo: data.user});
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
        heading="Welcome"
        subHeading="Let's get started by creating your account">
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            placeholder="john doe"
            label="Name"
            keyboardType="email-address"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="email"
            placeholder="john@gmail.com"
            label="Email"
            containerStyle={styles.marginBottom}
          />
          <AuthInputField
            name="password"
            placeholder="*******"
            label="Password"
            autoCapitalize="none"
            secureTextEntry={secureEntry}
            containerStyle={styles.marginBottom}
            rightIcon={<PasswordVisibiltyIcon privateIcon={secureEntry} />}
            onRightIconPress={() => {
              setSecureEntry(!secureEntry);
            }}
          />
          <SubmitBtn title="Sign Up" />
          <View style={styles.linkContainer}>
            <AppLink
              title="I lost my Password"
              onPress={() => {
                navigate('lostPassword');
              }}
            />
            <AppLink
              title="Sign in"
              onPress={() => {
                navigate('signIn');
              }}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

export default SignUp;

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

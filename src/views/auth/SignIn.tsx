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
import {AuthSatckParamList} from 'src/@types/navigation';
import AppButton from '@ui/AppButton';
import client from 'src/api/client';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoginState, updateProfie } from 'src/store/auth';
import { Keys, saveToAsyncStorage } from '@utils/asyncStorage';

interface Props {}

const initialValues = {
  email: '',
  password: '',
};

interface SingInUserInfo  {
  email:string
  password:string
}

const signupSchema = Yup.object({
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

const SignIn: FC<Props> = props => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [secureEntry, setSecureEntry] = useState(true);
  const {navigate} = useNavigation<NavigationProp<AuthSatckParamList>>();
  const {loggedIn, profile} = useSelector((state:any) => state.auth)
  const dispatch = useDispatch()
  const handleSubmit = async (
    values: SingInUserInfo,
    actions: FormikHelpers<SingInUserInfo>,
  ) => {
    actions.setSubmitting(true)
    try {
      const {data} = await client.post('/auth/sign-in', {
        ...values
      });
      console.log(data);
      await saveToAsyncStorage(Keys.AUTH_TOKEN,data.token)
      dispatch(updateProfie(data.profile))
      dispatch(updateLoginState(true))
    } catch (error) {
      console.log(error);
      
    }
    actions.setSubmitting(false)
  };

  console.log('================loggedIn====================');
  console.log(profile);

  return (
    <Form
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={handleSubmit}>
      <AuthFormContainer heading="Welcome Back!">
        <View style={styles.formContainer}>
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
          <SubmitBtn title="Sign In" />
          <View style={styles.linkContainer}>
            <AppLink
              title="I lost my Password"
              onPress={() => {
                navigate('lostPassword');
              }}
            />
            <AppLink
              title="Sign Up"
              onPress={() => {
                navigate('signUp');
              }}
            />
          </View>
        </View>
      </AuthFormContainer>
    </Form>
  );
};

export default SignIn;

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

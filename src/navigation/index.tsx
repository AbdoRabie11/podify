import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AuthNavigator from './AuthNavigator';
import {useDispatch, useSelector} from 'react-redux';
import TabNavigator from './TabNavigator';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import client from 'src/api/client';
import {updateBusyState, updateLoginState, updateProfie} from 'src/store/auth';
import Loader from '@ui/Loader';
import colors from '@utils/colors';

interface Props {}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.PRIMARY,
    primary:colors.CONTRAST
  },
};

const AppNavigator: FC<Props> = props => {
  const {loggedIn, busy} = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAuthInfo = async () => {
      dispatch(updateBusyState(true));
      try {
        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        if (!token) {
          return dispatch(updateBusyState(false));
        }
        const {data} = await client.get('/auth/is-auth', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        console.log('my auth profile', data);
        dispatch(updateProfie(data.profile));
        dispatch(updateLoginState(true));
      } catch (error) {
        console.log(error);
      }
      dispatch(updateBusyState(false));
    };
    fetchAuthInfo();
  }, []);

  return (
    <NavigationContainer theme={AppTheme}>
      {busy ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.OVERLAY,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}>
          <Loader />
        </View>
      ) : null}
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  container: {},
});

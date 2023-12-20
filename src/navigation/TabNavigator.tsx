import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '@views/Home';
import Profile from '@views/Profile';
import UploadScreen from '@views/UploadScreen';
import colors from '@utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();
interface Props {}

const TabNavigator: FC<Props> = props => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.PRIMARY,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: props => {
            console.log(props);

            return (
              <AntDesign name="home" size={props.size} color={props.color} />
            );
          },
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarIcon: props => {
            console.log(props);

            return (
              <AntDesign name="user" size={props.size} color={props.color} />
            );
          },
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={{
          tabBarIcon: props => {
            console.log(props);

            return (
              <MaterialCommunity
                name="account-music-outline"
                size={props.size}
                color={props.color}
              />
            );
          },
          tabBarLabel: 'Upload',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  container: {},
});

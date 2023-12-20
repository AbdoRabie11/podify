import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LostPassword from '@views/auth/LostPassword';
import SignIn from '@views/auth/SignIn';
import SignUp from '@views/auth/SignUp';
import Verification from '@views/auth/Verification';
import { AuthSatckParamList } from 'src/@types/navigation';


const Stack = createNativeStackNavigator<AuthSatckParamList>();


const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
        <Stack.Screen name='signIn' component={SignIn} />
        <Stack.Screen name='signUp' component={SignUp} />
        <Stack.Screen name='lostPassword' component={LostPassword} />
        <Stack.Screen name='verification' component={Verification} />
       </Stack.Navigator>
  )
}



export default AuthNavigator
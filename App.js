import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import SignUp from './src/screens/authorization';

const Stack = createStackNavigator();

export default function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [showSignUp, setShowSignUp] = useState(true);

   return (
      <NavigationContainer>
         {isLoggedIn ? (
            <Stack.Navigator headerMode='none'>
               <Stack.Screen options={{ title: 'Send Money' }} name='SignUp' component={SignUp} />
            </Stack.Navigator>
         ) : (
            <SignUp signUp={showSignUp} onMethodPress={() => setShowSignUp(!showSignUp)} />
         )}
      </NavigationContainer>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

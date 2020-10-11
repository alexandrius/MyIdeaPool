import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';

import SignUp from './src/screens/authorization';
import Ideas from './src/screens/ideas';

const Stack = createStackNavigator();

export default function App() {
   const [isLoggedIn, setLoggedIn] = useState(false);
   const [showSignUp, setShowSignUp] = useState(true);

   return (
      <NavigationContainer>
         {isLoggedIn ? (
            <Stack.Navigator headerMode='none'>
               <Stack.Screen name='Ideas' component={Ideas} />
            </Stack.Navigator>
         ) : (
            <SignUp
               signUp={showSignUp}
               setLoggedIn={() => setLoggedIn(true)}
               onMethodPress={() => setShowSignUp(!showSignUp)}
            />
         )}
      </NavigationContainer>
   );
}

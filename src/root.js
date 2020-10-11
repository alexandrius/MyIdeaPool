import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import useAuth from './hooks/useAuth';
import AddIdea from './screens/addIdea';
import SignUp from './screens/authorization';
import Ideas from './screens/ideas';

const Stack = createStackNavigator();

export default function Root() {
   const { isLoggedIn, showSignUp, setShowSignUp } = useAuth();

   return (
      <NavigationContainer>
         {isLoggedIn ? (
            <Stack.Navigator headerMode='none'>
               <Stack.Screen name='Ideas' component={Ideas} />
               <Stack.Screen name='AddIdea' component={AddIdea} />
            </Stack.Navigator>
         ) : (
            <SignUp onMethodPress={() => setShowSignUp(!showSignUp)} />
         )}
      </NavigationContainer>
   );
}

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./src/screens/authorization";

const Stack = createStackNavigator();

export default function App() {


   return (
      <NavigationContainer>
         <Stack.Navigator headerMode="none">
            <Stack.Screen
               options={{ title: "Send Money" }}
               name="SignUp"
               component={SignUp}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

import React from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import Button from '../components/button';
import Header from '../components/header';
import TextInput from '../components/textInput';
import { colors } from '../styles';

export default function Authorization({ signUp = true, onMethodPress }) {
   const title = signUp ? 'Sign Up' : 'Log in';
   const bottomText = signUp ? 'Already have an account?' : 'Don’t have an account?';
   const bottomTextPressable = signUp ? ' Log in' : ' Create an account';

   return (
      <View style={styles.flex}>
         <Header />
         <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {signUp && <TextInput style={styles.input} placeholder='Name' />}
            <TextInput style={styles.input} placeholder='Email' />
            <TextInput style={styles.input} placeholder='Password' />

            <Button title={title} style={styles.button} />
         </KeyboardAvoidingView>
         <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>{bottomText}</Text>
            <TouchableOpacity onPress={onMethodPress}>
               <Text style={styles.bottomTextPressable}>{bottomTextPressable}</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   flex: {
      flex: 1,
   },
   container: {
      paddingHorizontal: 29,
   },
   title: {
      fontSize: 24,
      color: colors.text,
      alignSelf: 'center',
      fontWeight: 'bold',
      marginTop: 55,
      lineHeight: 33,
      marginBottom: 56,
   },
   input: {
      marginTop: 26,
   },
   button: {
      marginTop: 35,
   },
   bottomTextContainer: {
      flexDirection: 'row',
      position: 'absolute',
      justifyContent: 'center',
      width: '100%',
      bottom: 40,
   },
   bottomText: {
      fontSize: 14,
      lineHeight: 17,
      color: colors.text,
   },
   bottomTextPressable: {
      fontSize: 14,
      lineHeight: 17,
      color: colors.primary,
   },
});

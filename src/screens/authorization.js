import React from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import Button from '../components/button';
import Header from '../components/header';
import TextInput from '../components/textInput';
import useAuth from '../hooks/useAuth';
import { colors } from '../styles';

export default function Authorization({ onMethodPress }) {
   const {
      name,
      setName,
      email,
      setEmail,
      password,
      setPassword,
      authorize,
      loading,
      showSignUp,
   } = useAuth();

   const title = showSignUp ? 'Sign Up' : 'Log in';
   const bottomText = showSignUp ? 'Already have an account?' : 'Don’t have an account?';
   const bottomTextPressable = showSignUp ? ' Log in' : ' Create an account';

   return (
      <View style={styles.flex}>
         <Header />
         <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {showSignUp && (
               <TextInput
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  placeholder='Name'
                  autoCapitalize='words'
                  editable={!loading}
               />
            )}
            <TextInput
               value={email}
               onChangeText={setEmail}
               style={styles.input}
               placeholder='Email'
               autoCapitalize='none'
               editable={!loading}
            />
            <TextInput
               value={password}
               onChangeText={setPassword}
               style={styles.input}
               placeholder='Password'
               autoCapitalize='none'
               secureTextEntry
               editable={!loading}
            />

            <Button loading={loading} title={title} style={styles.button} onPress={authorize} />
         </KeyboardAvoidingView>
         <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>{bottomText}</Text>
            <TouchableOpacity disabled={loading} onPress={onMethodPress}>
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

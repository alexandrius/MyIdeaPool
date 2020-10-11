import React from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import Header from "../components/header";
import TextInput from "../components/textInput";
import { colors } from "../styles";

export default function Authorization({ signUp = true }) {
   return (
      <View>
         <Header />
         <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text style={styles.title}>{signUp ? "Sign Up" : "Sign in"}</Text>

            {signUp && <TextInput style={styles.input} placeholder="Name" />}
            <TextInput style={styles.input} placeholder="Email" />
            <TextInput style={styles.input} placeholder="Password" />
         </KeyboardAvoidingView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 29,
   },
   title: {
      fontSize: 24,
      color: colors.text,
      alignSelf: "center",
      fontWeight: "bold",
      marginTop: 55,
      lineHeight: 33,
      marginBottom: 56,
   },
   input: {
      marginTop: 26,
   },
});

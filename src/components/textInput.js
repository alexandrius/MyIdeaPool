import React from "react";
import { View, TextInput as RNTextInput, StyleSheet } from "react-native";
import { colors } from "../styles";

export default function TextInput({ style, ...rest }) {
   return (
      <View style={[styles.input, style]}>
         <RNTextInput underlineColorAndroid="transparent" {...rest} />
      </View>
   );
}

const styles = StyleSheet.create({
   input: {
      paddingVertical: 7,
      borderBottomColor: colors.divider,
      borderBottomWidth: 1,
   },
});

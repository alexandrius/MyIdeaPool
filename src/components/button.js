import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

import { colors } from '../styles';

export default function Button({ style, title, onPress }) {
   return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.6} style={[styles.button, style]}>
         <Text style={styles.label}>{title}</Text>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   button: {
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
   },
   label: {
      color: 'white',
      fontSize: 14,
   },
});

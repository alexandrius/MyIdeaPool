import React from 'react';
import { StyleSheet, View } from 'react-native';

import Header from '../components/header';

export default function AddIdea() {
   return (
      <View style={styles.flex}>
         <Header showBackButton />
      </View>
   );
}

const styles = StyleSheet.create({
   flex: {
      flex: 1,
   },
});

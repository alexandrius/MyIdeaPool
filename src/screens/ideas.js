import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import Header from '../components/header';
import useIdeas from '../hooks/useIdeas';

export default function Ideas() {
   const { ideas } = useIdeas();

   return (
      <View style={styles.flex}>
         <Header
            renderRight={() => (
               <TouchableOpacity>
                  <Text style={styles.logout}>Log out</Text>
               </TouchableOpacity>
            )}
         />
         <FlatList data={ideas} />
      </View>
   );
}

const styles = StyleSheet.create({
   flex: {
      flex: 1,
   },
   logout: {
      color: 'white',
      marginRight: 19,
      fontSize: 17,
      letterSpacing: -0.41,
   },
});

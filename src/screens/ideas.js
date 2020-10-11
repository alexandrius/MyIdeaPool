import { Entypo } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import Header from '../components/header';
import useIdeas from '../hooks/useIdeas';
import { colors } from '../styles';

export default function Ideas({ navigation }) {
   const { ideas, fetchIdeas } = useIdeas();

   useEffect(() => {
      fetchIdeas();
   }, []);

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

         <TouchableOpacity
            onPress={() => navigation.navigate('AddIdea')}
            style={styles.addContainer}
            activeOpacity={0.8}>
            <Entypo color='white' size={50} name='plus' />
         </TouchableOpacity>
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
   addContainer: {
      position: 'absolute',
      right: 29,
      bottom: getBottomSpace() + 33,
      height: 60,
      width: 60,
      borderRadius: 30,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
   },
});

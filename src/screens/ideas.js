import { useActionSheet } from '@expo/react-native-action-sheet';
import { Entypo } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   FlatList,
   Image,
   Alert,
   ActivityIndicator,
   Animated,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import Header from '../components/header';
import useAuth from '../hooks/useAuth';
import useIdeas from '../hooks/useIdeas';
import { colors } from '../styles';

function ScoreKeyValue({ top, bottom }) {
   return (
      <View style={styles.score}>
         <Text style={styles.scoreValue}>{top.toString()}</Text>
         <Text style={styles.scoreKey}>{bottom.toString()}</Text>
      </View>
   );
}

function Idea({ content, impact, ease, confidence, average_score, onOptionsPress }) {
   const [scale] = useState(new Animated.Value(0.8));

   useEffect(() => {
      Animated.spring(scale, {
         toValue: 1,
         duration: 300,
         useNativeDriver: true,
      }).start();
   }, []);

   return (
      <Animated.View style={[styles.idea, { transform: [{ scale }] }]}>
         <Text style={styles.ideaContent}>{content}</Text>
         <View style={styles.divider} />
         <View style={styles.rowJustify}>
            <View style={styles.row}>
               <ScoreKeyValue bottom='Impact' top={impact} />
               <ScoreKeyValue bottom='Ease' top={ease} />
               <ScoreKeyValue bottom='Confidence' top={confidence} />
            </View>
            <ScoreKeyValue bottom='Avg.' top={average_score} />
         </View>
         <TouchableOpacity onPress={onOptionsPress} style={styles.scoreOptions}>
            <Entypo color='rgba(42,56,66,0.23)' size={20} name='dots-three-vertical' />
         </TouchableOpacity>
      </Animated.View>
   );
}

const options = ['Cancel', 'Edit', 'Delete'];

export default function Ideas({ navigation }) {
   const {
      ideas,
      fetchIdeas,
      loading,
      deleteIdea,
      clearIdeas,
      reachedEnd,
      loadMoreIdeas,
   } = useIdeas();
   const { logout } = useAuth();

   const { showActionSheetWithOptions } = useActionSheet();

   useEffect(() => {
      fetchIdeas();
   }, []);

   function onOptionsPress(item) {
      showActionSheetWithOptions(
         {
            options,
            destructiveButtonIndex: 2,
            cancelButtonIndex: 0,
         },
         (i) => {
            switch (i) {
               case 1:
                  navigation.navigate('AddIdea', { idea: item });
                  break;
               case 2:
                  Alert.alert(
                     'Are you sure?',
                     'This idea will be permanently deleted.',
                     [
                        {
                           text: 'Cancel',
                           style: 'cancel',
                        },
                        { text: 'OK', onPress: () => deleteIdea(item.id) },
                     ],
                     { cancelable: false }
                  );
                  break;
            }
         }
      );
   }

   return (
      <View style={styles.flex}>
         <Header
            renderRight={() => (
               <TouchableOpacity
                  onPress={() => {
                     clearIdeas();
                     logout();
                  }}>
                  <Text style={styles.logout}>Log out</Text>
               </TouchableOpacity>
            )}
         />
         <FlatList
            data={ideas}
            contentContainerStyle={styles.listContent}
            refreshing={loading}
            onRefresh={() => fetchIdeas(1)}
            ListEmptyComponent={
               <View style={styles.emptyContainer}>
                  {!loading && (
                     <>
                        <Image
                           source={require('../../assets/images/lightbulb_big/lightbulb_big.png')}
                        />
                        <Text style={styles.gotIdeas}>Got Ideas?</Text>
                     </>
                  )}
               </View>
            }
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
               <Idea {...item} onOptionsPress={() => onOptionsPress(item)} />
            )}
            onEndReached={() => loadMoreIdeas()}
            ListFooterComponent={
               <View>
                  {!reachedEnd && (
                     <View style={styles.footer}>
                        <ActivityIndicator />
                     </View>
                  )}
               </View>
            }
         />

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
   row: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   rowJustify: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   listContent: {
      flexGrow: 1,
      paddingHorizontal: 12,
      paddingBottom: getBottomSpace(),
   },
   emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
   },
   gotIdeas: {
      marginTop: 21,
      color: colors.text,
      fontSize: 20,
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
   idea: {
      shadowColor: '#000000',
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.33,
      shadowRadius: 1.41,
      elevation: 2,

      marginVertical: 7.5,
      paddingRight: 11,
      paddingTop: 12,
      paddingBottom: 18,
      backgroundColor: 'white',
      borderRadius: 5,
   },
   ideaContent: {
      fontSize: 16,
      lineHeight: 18,
      color: colors.text,
      marginLeft: 17,
   },
   divider: {
      marginTop: 13,
      marginBottom: 9,
      height: 1,
      backgroundColor: 'rgba(151,151,151,0.17);',
   },
   score: {
      alignItems: 'center',
      marginLeft: 20,
   },
   scoreKey: {
      fontSize: 14,
      marginTop: 1,
      lineHeight: 17,
   },
   scoreValue: {
      lineHeight: 18,
      fontSize: 16,
   },
   scoreOptions: {
      position: 'absolute',
      right: 11,
      top: 11,
   },
   optionsIcon: {
      marginHorizontal: 11,
   },
   footer: {
      marginTop: getBottomSpace() || 10,
      alignItems: 'center',
   },
});

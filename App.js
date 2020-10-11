import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider } from 'aniuta';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { View } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';

import Root from './src/root';
import MemCache from './src/utils/memCache';
import { enableAndroidLayoutChanges } from './src/utils/utils';

enableAndroidLayoutChanges();
SplashScreen.preventAutoHideAsync();

export default function App() {
   return (
      <View style={{ flex: 1 }}>
         <ActionSheetProvider>
            <Provider>
               <Root />
            </Provider>
         </ActionSheetProvider>
         <DropdownAlert ref={(ref) => (MemCache.alert = ref)} />
      </View>
   );
}

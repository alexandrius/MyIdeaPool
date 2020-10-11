import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider } from 'aniuta';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';

import Root from './src/root';
import { enableAndroidLayoutChanges } from './src/utils/utils';

enableAndroidLayoutChanges();
SplashScreen.preventAutoHideAsync();

export default function App() {
   return (
      <ActionSheetProvider>
         <Provider>
            <Root />
         </Provider>
      </ActionSheetProvider>
   );
}

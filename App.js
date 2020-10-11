import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider } from 'aniuta';
import React from 'react';

import Root from './src/root';

export default function App() {
   return (
      <ActionSheetProvider>
         <Provider>
            <Root />
         </Provider>
      </ActionSheetProvider>
   );
}

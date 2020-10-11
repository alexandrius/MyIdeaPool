import { Provider } from 'aniuta';
import React from 'react';

import Root from './src/root';

export default function App() {
   return (
      <Provider>
         <Root />
      </Provider>
   );
}

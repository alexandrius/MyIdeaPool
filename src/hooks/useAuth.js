import AsyncStorage from '@react-native-community/async-storage';
import { createStore } from 'aniuta';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';

import Ajax from '../services/ajax';
import MemCache from '../utils/memCache';

const useAuth = createStore({
   name: 'AuthStore',
   Store: () => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState(__DEV__ ? 'epic@yopmail.com' : '');
      const [password, setPassword] = useState(__DEV__ ? 'Password1#' : '');
      const [loading, setLoading] = useState(false);
      const [isLoggedIn, setLoggedIn] = useState(false);
      const [showSignUp, setShowSignUp] = useState(true);

      async function checkAuthorization() {
         const refresh_token = await AsyncStorage.getItem('refresh_token');
         MemCache.refresh_token = refresh_token;
         setLoggedIn(!!refresh_token);
         await SplashScreen.hideAsync();
      }

      useEffect(() => {
         checkAuthorization();
      }, []);

      function signUp() {
         return Ajax.post('users', { name, email, password });
      }

      function login() {
         return Ajax.post('access-tokens', { email, password });
      }

      function authorize() {
         MemCache.token_timestamp = new Date().getTime();
         const request = showSignUp ? signUp() : login();
         setLoading(true);
         request
            .then(({ jwt, refresh_token }) => {
               MemCache.jwt = jwt;
               MemCache.refresh_token = refresh_token;
               AsyncStorage.setItem('jwt', jwt);
               AsyncStorage.setItem('refresh_token', refresh_token);
               setLoggedIn(true);
            })
            .catch(() => {
               setLoading(false);
            });
      }

      function logout() {
         Ajax.delete('access-tokens', { refresh_token: MemCache.refresh_token });
         setLoggedIn(false);
         setLoading(false);
         AsyncStorage.clear();
         MemCache.jwt = '';
         MemCache.refresh_token = '';
         MemCache.token_timestamp = 1;
      }

      return {
         name,
         setName,
         email,
         setEmail,
         password,
         setPassword,
         loading,
         authorize,
         isLoggedIn,
         showSignUp,
         setShowSignUp,
         logout,
      };
   },
});

export default useAuth;

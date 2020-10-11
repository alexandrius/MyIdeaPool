import { createStore } from 'aniuta';
import { useState } from 'react';

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

      function signUp() {
         return Ajax.post('users', { name, email, password });
      }

      function login() {
         return Ajax.post('access-tokens', { email, password });
      }

      function authorize() {
         const request = showSignUp ? signUp() : login();
         setLoading(true);
         request
            .then(({ jwt, refresh_token }) => {
               MemCache.jwt = jwt;
               MemCache.refresh_token = refresh_token;
               setLoggedIn(true);
            })
            .catch(() => {
               //TODO: show error
               setLoading(false);
            });
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
      };
   },
});

export default useAuth;

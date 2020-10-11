import { useState } from 'react';

import Ajax from '../services/ajax';
import MemCache from '../utils/memCache';

export default function useAuth(isSignUp, setLoggedIn) {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);

   function signUp() {
      return Ajax.post('users', { name, email, password });
   }

   function login() {
      return Ajax.post('access-tokens', { email, password });
   }

   function authorize() {
      const request = isSignUp ? signUp() : login();
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

   return { name, setName, email, setEmail, password, setPassword, loading, authorize };
}

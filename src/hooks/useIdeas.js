import { createStore } from 'aniuta';
import { useState, useRef } from 'react';

import Ajax from '../services/ajax';

const useIdeas = createStore({
   name: 'IdeasStore',
   Store: () => {
      const indexRef = useRef(1);
      const [loadingMore, setLoadingMore] = useState(false);
      const [loading, setLoading] = useState(false);
      const [reachedEnd, setReachedEnd] = useState(false);
      const [ideas, setIdeas] = useState([]);

      function fetchIdeas(index = 1) {
         if (index === 1) {
            setLoading(true);
         } else {
            setLoadingMore(true);
         }
         indexRef.current = indexRef.current + 1;
         Ajax.get(`ideas?page=${index}`).then((data) => {
            if (data.length < 10) setReachedEnd(true);

            if (index === 1) {
               setIdeas(data);
            } else {
               setIdeas([...ideas, data]);
            }
         });
      }

      function loadMoreIdeas() {
         fetchIdeas(indexRef.current);
      }

      return {
         loading,
         loadingMore,
         reachedEnd,
         ideas,
         loadMoreIdeas,
         fetchIdeas,
         setIdeas
      };
   },
});

export default useIdeas;

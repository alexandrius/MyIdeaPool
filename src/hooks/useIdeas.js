import { createStore } from 'aniuta';
import { useState, useRef } from 'react';

import Ajax from '../services/ajax';
import { animateLayoutChanges } from '../utils/utils';

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
            indexRef.current = 1;
            setLoading(true);
         } else {
            setLoadingMore(true);
         }
         indexRef.current = indexRef.current + 1;
         Ajax.get(`ideas?page=${index}`).then((data) => {
            if (data.length < 10) setReachedEnd(true);

            if (index === 1) {
               setIdeas(data);
               setLoading(false);
            } else {
               setIdeas([...ideas, data]);
               setLoadingMore(false);
            }
         });
      }

      function deleteIdea(id) {
         Ajax.delete(`ideas/${id}`).then(() => {
            const _ideas = [...ideas];
            for (let i = 0; i < _ideas.length; i++) {
               if (_ideas[i].id === id) {
                  _ideas.splice(i, 1);
                  break;
               }
            }
            setIdeas(_ideas);
            animateLayoutChanges();
         });
      }

      function loadMoreIdeas() {
         fetchIdeas(indexRef.current);
      }

      function clearIdeas() {
         indexRef.current = 1;
         setLoadingMore(false);
         setReachedEnd(false);
         setLoading(false);
         setIdeas([]);
      }

      return {
         loading,
         loadingMore,
         reachedEnd,
         ideas,
         loadMoreIdeas,
         fetchIdeas,
         setIdeas,
         deleteIdea,
         clearIdeas,
      };
   },
});

export default useIdeas;

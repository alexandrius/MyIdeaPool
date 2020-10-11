import { createStore } from 'aniuta';
import { useState, useRef } from 'react';

import Ajax from '../services/ajax';
import { animateLayoutChanges } from '../utils/utils';

const useIdeas = createStore({
   name: 'IdeasStore',
   Store: () => {
      const indexRef = useRef(1);
      const [loadingMore, setLoadingMoreRaw] = useState(false);
      const loadingMoreRef = useRef(false);
      const [loading, setLoadingRaw] = useState(false);
      const loadingRef = useRef(false);
      const [reachedEnd, setReachedEndRaw] = useState(false);
      const reachedEndRef = useRef(false);

      const [ideas, setIdeas] = useState([]);

      function setLoading(loading) {
         loadingRef.current = loading;
         setLoadingRaw(loading);
      }

      function setLoadingMore(loading) {
         loadingMoreRef.current = loading;
         setLoadingMoreRaw(loading);
      }

      function setReachedEnd(reachedEnd) {
         reachedEndRef.current = reachedEnd;
         setReachedEndRaw(reachedEnd);
      }

      function fetchIdeas(index = 1) {
         if (!loadingMoreRef.current && !loadingRef.current) {
            if (index === 1) {
               indexRef.current = 1;
               setLoading(true);
               setReachedEnd(false);
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
                  setIdeas([...ideas, ...data]);
                  setLoadingMore(false);
               }
            });
         }
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
         if (!reachedEndRef.current && ideas.length >= 10) fetchIdeas(indexRef.current);
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

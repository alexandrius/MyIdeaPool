import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import Ajax from '../services/ajax';
import MemCache from '../utils/memCache';
import useIdeas from './useIdeas';

export default function useAddIdea(idea) {
   const [content, setContent] = useState(idea?.content || '');
   const [impact, setImpact] = useState(idea?.impact || '10');
   const [ease, setEase] = useState(idea?.ease || '10');
   const [confidence, setConfidence] = useState(idea?.confidence || '10');
   const [avg, setAvg] = useState(idea?.average_score || '10.00');
   const [loading, setLoading] = useState(false);
   const { ideas, setIdeas } = useIdeas();

   const navigation = useNavigation();

   useEffect(() => {
      setAvg(Number((Number(impact) + Number(ease) + Number(confidence)) / 3).toFixed(2));
   }, [impact, ease, confidence]);

   function createOrUpdateIdea() {
      if (content) {
         setLoading(true);
         const body = {
            content,
            impact: Number(impact),
            ease: Number(ease),
            confidence: Number(confidence),
         };

         const request = idea?.id ? Ajax.put(`ideas/${idea.id}`, body) : Ajax.post(`ideas`, body);
         request.then((data) => {
            if (idea?.id) {
               for (let i = 0; i < ideas.length; i++) {
                  if (ideas[i].id === idea.id) {
                     const _ideas = [...ideas];
                     _ideas[i] = data;
                     console.log('update');
                     setIdeas(_ideas);
                     break;
                  }
               }
            } else {
               setIdeas([data, ...ideas]);
            }
            navigation.goBack();
         });
      } else {
         MemCache.alert.alertWithType('warn', 'Content Empty', 'Please fill content');
      }
   }

   return {
      content,
      setContent,
      impact,
      setImpact,
      ease,
      setEase,
      confidence,
      setConfidence,
      avg,
      loading,
      createOrUpdateIdea,
   };
}

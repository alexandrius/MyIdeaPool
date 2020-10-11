import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

import Ajax from '../services/ajax';
import useIdeas from './useIdeas';

export default function useAddIdea(idea) {
   const [content, setContent] = useState(idea?.content || '');
   const [impact, setImpact] = useState(idea?.impact || '10');
   const [ease, setEase] = useState(idea?.ease || '10');
   const [confidence, setConfidence] = useState(idea?.confidence || '10');
   const [avg, setAvg] = useState(idea?.average_score || '10');
   const [loading, setLoading] = useState(false);
   const { ideas, setIdeas } = useIdeas();

   const navigation = useNavigation();

   function createOrUpdateIdea() {
      setLoading(true);
      const request = idea?.id ? Ajax.put(`ideas/${idea.id}`) : Ajax.post(`ideas`);
      request.then((idea) => {
         if (idea?.id) {
            for (let i = 0; i < ideas.length; i++) {
               if (ideas[i].id === idea?.id) {
                  const _ideas = [...ideas];
                  _ideas[i] = idea;

                  setIdeas(_ideas);
                  break;
               }
            }
         } else {
            setIdeas([idea, ...ideas]);
         }
         navigation.goBackc();
      });
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
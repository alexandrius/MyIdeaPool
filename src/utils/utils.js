import { LayoutAnimation, Platform, UIManager } from 'react-native';

export const enableAndroidLayoutChanges = () => {
   if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental?.(true);
};

export const animateLayoutChanges = () => {
   const linearAnim = {
      duration: 200,
      create: {
         type: LayoutAnimation.Types.linear,
         property: LayoutAnimation.Properties.opacity,
      },
      update: {
         type: LayoutAnimation.Types.linear,
      },
   };
   LayoutAnimation.configureNext(linearAnim);
};

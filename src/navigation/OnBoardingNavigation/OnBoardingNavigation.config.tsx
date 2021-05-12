import { ThemeScreen } from 'screens/Onbarding/ThemeScreen';
import { NotificationScreen } from 'screens/Onbarding/NotificationScreen';
import { LanguagesScreen } from 'screens/Languages';

export const OnBoardingConfig = [
  {
    id: 1,
    component: LanguagesScreen,
    name: 'Language',
  },
  {
    id: 2,
    component: ThemeScreen,
    name: 'Theme',
  },
  {
    id: 3,
    component: NotificationScreen,
    name: 'Notification',
  },
];

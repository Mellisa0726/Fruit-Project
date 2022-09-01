import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          SignUp: {
            screens: {
              SignUpScreen: 'SignUp',
            },
          },
          Knowledge: {
            screens: {
              KnowledgeScreen: 'Knowledge',
            },
          },
          Camera: {
            screens: {
              CameraScreen: 'Camera',
            },
          },
          Calendar: {
            screens: {
              CalendarScreen: 'Calendar',
            },
          },
          Setting: {
            screens: {
              SettingScreen: 'Setting',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;

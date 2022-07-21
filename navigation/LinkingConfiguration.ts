import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Login: {
            screens: {
              LoginScreen: 'login',
            },
          },
          Knowledge: {
            screens: {
              KnowledgeScreen: 'one',
            },
          },
          Camera: {
            screens: {
              CameraScreen: 'camera',
            },
          },
          Calendar: {
            screens: {
              CalendarScreen: 'three',
            },
          },
          Setting: {
            screens: {
              SettingScreen: 'four',
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

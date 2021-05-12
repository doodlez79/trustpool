import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'helpers/ThemeManage';
import { perfectSize } from 'helpers/PerfectSize';
import { View } from 'react-native';

import { BottomNavigatorConfig, tabBarOptions } from './BottomNavigation.config';

const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={ tabBarOptions(colors) }>
      {
        BottomNavigatorConfig.map(item => {
          if (item.name === 'Menu') {
            return (
              <Tab.Screen
                key={ item.id }
                name={ item.name }
                component={ item.component }
                options={{
                  tabBarLabel: t(`screens.${item.name}.nameScreen`),
                  tabBarIcon: ({ color, focused }) => (
                    <View style={{
                      width: perfectSize(24),
                      marginBottom: 5,
                    }}
                    >
                      {item.icon(color, colors.secondaryText, focused)}
                    </View>
                  ),
                }}
                listeners={ ({ navigation }) => ({
                  tabPress: e => {
                    e.preventDefault();
                    navigation.toggleDrawer();
                  },
                }) }
              />
            );
          }
          return (
            <Tab.Screen
              key={ item.id }
              name={ item.name }
              component={ item.component }
              options={{
                tabBarLabel: t(`screens.${item.name}.nameScreen`),
                tabBarIcon: ({ color, focused }) => (
                  <View style={{
                    width: perfectSize(24),
                    marginBottom: 5,
                  }}
                  >
                    {item.icon(color, colors.secondaryText, focused)}
                  </View>
                ),
              }}
            />
          );
        })
      }
    </Tab.Navigator>
  );
};

export default BottomNavigator;

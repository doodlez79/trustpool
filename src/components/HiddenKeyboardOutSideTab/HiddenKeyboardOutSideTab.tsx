import React, { FC } from 'react';

import { ScrollView } from 'react-native';

const HiddenKeyboardOutSideTab:FC = ({ children }) => (
  <ScrollView
    style={{
      width: '100%',
    }}
    contentContainerStyle={{ flexGrow: 1 }}
    keyboardShouldPersistTaps="handled"
    scrollEnabled={ false }
    nestedScrollEnabled={ false }
  >
    {children}
  </ScrollView>
);

export default HiddenKeyboardOutSideTab;

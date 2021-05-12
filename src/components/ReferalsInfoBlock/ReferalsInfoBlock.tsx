import React, { FC } from 'react';
import {
  RefreshControl, ScrollView, View,
} from 'react-native';
import { ReferralLink } from '../ReferralLink';
import { ReferalsInfoText } from '../ReferalsInfoText';
import { styles } from './styles';
import { ReferalsInfoBlockProps } from './ReferalsInfoBlock.types';

const ReferalsInfoBlock:FC<ReferalsInfoBlockProps> = ({
  loading, onRefresh, userId,
}) => (
  <ScrollView
    contentContainerStyle={ styles.scrollViewContainer }
    refreshControl={ (
      <RefreshControl
        onRefresh={ onRefresh }
        refreshing={ loading || false }
      />
      ) }
  >
    <View style={ styles.infoBlock }>
      <ReferalsInfoText />
    </View>
    <ReferralLink userId={ userId } />
  </ScrollView>
);

export default ReferalsInfoBlock;

import React, { FC } from 'react';
import { perfectSize } from 'helpers/PerfectSize';
import { ReferalListType, ReferalsProfitType } from 'entitiesState/referal';
import {
  FlatList, Platform, RefreshControl, View,
} from 'react-native';
import { TYPE_REFERALS_CONTENT } from 'screens/Referal/types';
import { mainColors } from 'constants/colors';
import { ReferalsInfoText } from 'components/ReferalsInfoText';
import { ReferralLink } from 'components/ReferralLink';
import { Container } from 'components/Container';
import ReferalContentItem from '../ReferalItem/ReferalItem';
import { styles } from './styles';
import { ReferralRulesBlock } from '../ReferralRulesBlock';
import { ReferalsContentProps } from './ReferalsContent.types';
import { Preloader } from '../Preloader';
import { ReferalRewardEmptyScreen } from '../ReferalRewardEmptyScreen';

// eslint-disable-next-line max-len
const isReferals = (type: TYPE_REFERALS_CONTENT, data: ReferalsProfitType[] | ReferalListType[]): data is ReferalListType[] => type === TYPE_REFERALS_CONTENT.REFERALS_LIST;

const ReferalsContent: FC<ReferalsContentProps> = ({
  data, type, loading, meta,
  updateData, userId, onClick, coin,
}) => {
  if (isReferals(type, data)) {
    return (
      <>
        {
          loading
            ? (
              <View style={{ flex: 1 }}>
                <View style={{
                  position: 'absolute',
                  backgroundColor: colors.backgroundColor,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
                >
                  <Preloader heightContainer={ 48 } />
                </View>
              </View>

            )
            : (
              <FlatList<ReferalListType>
                showsVerticalScrollIndicator={ false }
                refreshControl={ (
                  <RefreshControl
                    onRefresh={ () => updateData(1, true) }
                    refreshing={ loading }
                    tintColor={ mainColors.blue }
                  />
                ) }
                ListHeaderComponent={ (
                  <>
                    <View style={{
                      marginBottom: perfectSize(20),
                      paddingHorizontal: perfectSize(16),
                    }}
                    >
                      <ReferalsInfoText />
                    </View>
                    <ReferralLink userId={ userId } />
                  </>
                ) }
                ListFooterComponent={ (
                  <View style={{ alignItems: 'center' }}>
                    {meta?.hasNext
                    && (
                      <View style={{ marginBottom: 20 }}>
                        <Preloader heightContainer={ 24 } stickStyle={{ backgroundColor: mainColors.blue }} />
                      </View>
                    )}
                  </View>
                ) }
                style={{ flex: 1, paddingHorizontal: perfectSize(16) }}
                contentContainerStyle={{ flex: data.length > 0 ? 0 : 1 }}
                data={ data }
                ListEmptyComponent={ () => (
                  <ReferralRulesBlock />
                ) }
                keyExtractor={ (item, index) => String(index) }
                onEndReached={ () => {
                  if (meta?.hasNext) {
                    updateData(meta.currPage + 1, false);
                  }
                } }
                onEndReachedThreshold={ Platform.OS === 'ios' ? 0 : 0.5 }
                renderItem={ ({ item }) => (
                  <ReferalContentItem item={ item } referals />
                ) }
              />
            )
        }

      </>
    );
  }
  return (
    <Container paddingSize={ 16 } style={{ flex: 1 }}>
      <View style={ styles.profitListContainer } />
      <FlatList<ReferalsProfitType>
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: data.length > 0 ? 0 : 1 }}
        showsVerticalScrollIndicator={ false }
        data={ data }
        ListFooterComponent={ (
          <View style={{ alignItems: 'center' }}>
            {meta?.hasNext && <Preloader heightContainer={ 24 } stickStyle={{ backgroundColor: mainColors.blue }} /> }
          </View>
          ) }
        ListEmptyComponent={ () => (
          <ReferalRewardEmptyScreen
            onClick={ onClick }
            coin={ coin }
          />
        ) }
        keyExtractor={ (item, index) => String(index) }
        refreshControl={ (
          <RefreshControl
            onRefresh={ () => updateData(1, true) }
            refreshing={ loading }
            tintColor={ mainColors.blue }
          />
        ) }
        onEndReached={ () => {
          if (meta?.hasNext) {
            updateData(meta.currPage + 1, false);
          }
        } }
        onEndReachedThreshold={ Platform.OS === 'ios' ? 0 : 0.5 }
        refreshing={ loading }
        renderItem={ ({ item }) => (
          <ReferalContentItem item={ item } referals={ false } />
        ) }
      />
    </Container>
  );
};

export default React.memo(ReferalsContent);

import React, { FC, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import Chevron from 'Icons/Chevron.svg';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WorkersInfoText } from '../WorkersInfoText';
import { WorkersLink } from '../WorkersLink';

import { styles } from './styles';
import { Btn } from '../Btn';
import { WorkersInfoNote } from '../WorkersInfoNote';
import { WorkersInfoBlockProps } from './WorkersInfoBlock.types';

const WorkersInfoBlock: FC<WorkersInfoBlockProps> = ({
  stratumInfo, coin,
}) => {
  const { t } = useTranslation();
  const insert = useSafeAreaInsets();

  const [ isShowMoreClicked, setIsShowMoreClicked ] = useState(false);
  return (
    <View style={ styles.scrollViewContainer }>
      <View style={ styles.infoBlock }>
        <WorkersInfoText />
      </View>
      <ScrollView
        contentContainerStyle={ styles.content }
        showsVerticalScrollIndicator={ false }
      >
        <WorkersLink
          label={ `${coin} ${t('screens.Workers.info.firstLinkLabel')}` }
          linkText={ stratumInfo.url }
        />
        <View style={ styles.note }>
          <WorkersInfoNote
            stratumInfo={ stratumInfo }
            isShowMoreClicked={ isShowMoreClicked }
          />
        </View>
        {isShowMoreClicked && (
          stratumInfo.urls.map((item: any, index: any) => (
            item !== stratumInfo.url && (
            <WorkersLink
              key={ item }
              label={ ` ${coin} ${t('screens.Workers.info.secondLinkLabel')} ${index + 1}` }
              linkText={ item }
            />
            )
          ))
        )}
        {stratumInfo.urls.length > 1 && (
        <View style={{ paddingBottom: 20 }}>
          <Btn
            style={{ marginBottom: insert.bottom }}
            title={ !isShowMoreClicked ? t('screens.Workers.info.showMore') : t('screens.Workers.info.showLess') }
            onClick={ () => (!isShowMoreClicked ? setIsShowMoreClicked(true) : setIsShowMoreClicked(false)) }
            Icon={ (
              <View style={{
                width: 10,
                height: 10,
                transform: [{
                  rotate: isShowMoreClicked ? '-180deg' : '0deg',
                }],
              }}
              >
                <Chevron fill="white" />
              </View>
            ) }
          />
        </View>
        )}
      </ScrollView>
    </View>
  );
};

export default WorkersInfoBlock;

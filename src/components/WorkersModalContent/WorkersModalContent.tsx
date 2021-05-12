import React, { FC, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Chevron from 'Icons/Chevron.svg';
import { mainColors } from 'constants/colors';
import { styles } from './styles';
import { ModalHeader } from '../ModalHeader';
import { WorkersModalProps } from './WorkersModalContent.types';
import { WorkersLink } from '../WorkersLink';
import { WorkersInfoText } from '../WorkersInfoText';
import { Btn } from '../Btn';
import { WorkersInfoNote } from '../WorkersInfoNote';

const WorkersModalContent: FC<WorkersModalProps> = ({ stratumInfo, loading, coin }) => {
  const { t } = useTranslation();
  const [ isShowMoreClicked, setIsShowMoreClicked ] = useState(false);

  return (
    <View style={ styles.container } onStartShouldSetResponder={ () => true }>
      <ModalHeader title={ t('screens.Workers.modal.title') } loading={ loading } />
      <ScrollView
        showsVerticalScrollIndicator={ false }
        style={ styles.scrollViewContainer }
      >
        <View>
          <View style={ styles.infoBlock }>
            <WorkersInfoText />
          </View>
          <WorkersLink
            label={ ` ${coin} ${t('screens.Workers.info.firstLinkLabel')}` }
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
                    <Chevron fill={ mainColors.white } />
                  </View>
                ) }
              />
            </View>
          )}
        </View>

      </ScrollView>
    </View>
  );
};

export default WorkersModalContent;

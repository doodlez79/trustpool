import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
import { useTranslation } from 'react-i18next';
import { styles } from './styles';
import { ModalHeader } from '../ModalHeader';
import { ReferralLink } from '../ReferralLink';
import { ReferralRulesBlock } from '../ReferralRulesBlock';
import { ReferalsInfoText } from '../ReferalsInfoText';

type ReferalModalProps = {
  userId: number
}

const ReferalModalContent: FC<ReferalModalProps> = ({ userId }) => {
  const { t } = useTranslation();

  return (
    <View style={ styles.container }>
      <ModalHeader title={ t('screens.Referals.modal.title') } />
      <ScrollView
        contentContainerStyle={ styles.scrollContainer }
        showsVerticalScrollIndicator={ false }
      >
        <View onStartShouldSetResponder={ () => true } style={{ alignItems: 'center', width: '100%' }}>
          <View style={{
            marginBottom: perfectSize(20),
            paddingHorizontal: perfectSize(16),
            alignItems: 'center',
          }}
          >
            <ReferalsInfoText />
          </View>
          <ReferralLink userId={ userId } />
          <ReferralRulesBlock />

        </View>

      </ScrollView>

    </View>
  );
};

export default ReferalModalContent;

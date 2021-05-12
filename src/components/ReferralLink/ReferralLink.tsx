import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
import Clipboard from 'expo-clipboard';
import { useTheme } from 'helpers/ThemeManage';
import CopyIcon from 'Icons/Copy.svg';
import { mainColors } from 'constants/colors';
import { Typography } from '../Typography';
import { styles } from './styles';

interface ReferralLinkProps {
  userId: number
}

const ReferralLink: FC<ReferralLinkProps> = ({ userId }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [ isLinkCopied, setIsLinkCopied ] = useState(false);

  const link = `trustpool.ru/signup?refer=${userId}`;

  const onLinkClick = () => {
    Clipboard.setString(link);
    setIsLinkCopied(true);
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 1500);
  };
  return (
    <View style={ styles.container }>
      <Typography
        text={ t('screens.Referals.linkLabel') }
        fontSize={ 14 }
        style={{
          marginBottom: perfectSize(5),
        }}
        color={ colors.text }
      />
      <TouchableOpacity
        onPress={ onLinkClick }
        style={ [ styles.link, { backgroundColor: colors.backgroundSelectedItem }] }
      >
        <Typography
          text={ link }
          color={ mainColors.blue }
        />
        <View style={{ width: perfectSize(16), height: perfectSize(16) }}>
          <CopyIcon fill={ colors.secondaryText } />
        </View>
      </TouchableOpacity>
      {isLinkCopied && (
        <Typography
          text={ t('screens.Referals.mention') }
          color={ colors.secondaryText }
          fontSize={ 14 }
        />
      ) }
    </View>
  );
};

export default ReferralLink;

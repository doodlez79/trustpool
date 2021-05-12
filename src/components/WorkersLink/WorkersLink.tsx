import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { perfectSize } from 'helpers/PerfectSize';
import Clipboard from 'expo-clipboard';
import { useTheme } from 'helpers/ThemeManage';
import CopyIcon from 'Icons/Copy.svg';
import { mainColors } from 'constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import { Typography } from '../Typography';
import { styles } from './styles';
import { WorkersLinkProps } from './WorkersLink.types';

const WorkersLink: FC<WorkersLinkProps> = ({ label, linkText }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const [ isLinkCopied, setIsLinkCopied ] = useState(false);

  const onLinkClick = () => {
    Clipboard.setString(linkText);
    setIsLinkCopied(true);
    setTimeout(() => {
      setIsLinkCopied(false);
    }, 1500);
  };
  return (
    <View style={ styles.container } onStartShouldSetResponder={ () => true }>
      <Typography
        text={ label }
        fontSize={ 14 }
        style={{
          marginBottom: perfectSize(5),
        }}
        color={ colors.text }
      />
      <View
        style={ [ styles.link, { backgroundColor: colors.backgroundSelectedItem }] }

      >
        <ScrollView horizontal showsHorizontalScrollIndicator={ false } style={{ marginRight: 16 }}>
          <Typography
            text={ linkText }
            color={ mainColors.blue }
          />
        </ScrollView>
        <TouchableOpacity onPress={ onLinkClick } style={{ width: perfectSize(16), height: perfectSize(16) }}>
          <CopyIcon fill={ colors.secondaryText } />
        </TouchableOpacity>
      </View>
      {isLinkCopied && (
        <Typography
          text={ t('screens.Referals.mention') }
          color={ colors.secondaryText }
          fontSize={ 12.8 }
        />
      ) }
    </View>
  );
};

export default WorkersLink;

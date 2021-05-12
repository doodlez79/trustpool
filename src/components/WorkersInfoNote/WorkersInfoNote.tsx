import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useTheme } from 'helpers/ThemeManage';
import { Typography } from '../Typography';
import { WorkersInfoNoteProps } from './WorkersInfoNote.types';

const WorkersInfoNote: FC<WorkersInfoNoteProps> = ({ stratumInfo, isShowMoreClicked }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  return (
    <>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
      >
        <Typography
          text={ `${t('screens.Workers.info.note')} ` }
          color={ colors.secondaryText }
          fontSize={ 12.8 }
        />
        <Typography
          text={ stratumInfo.backupPorts[1]
            ? `${stratumInfo.backupPorts[0]}/${stratumInfo.backupPorts[1]} `
            : `${stratumInfo.backupPorts[0]} ` }
          color={ colors.secondaryText }
          fontSize={ 12.8 }
        />
        <Typography
          text={ `${t('screens.Workers.info.available')} ` }
          color={ colors.secondaryText }
          fontSize={ 12.8 }
        />
        {(isShowMoreClicked && stratumInfo.urls.length > 1) && (
        <Typography
          text={ `${t('screens.Workers.info.forAllUrls')} ` }
          color={ colors.secondaryText }
          fontSize={ 12.8 }
        />
        )}
      </View>
    </>
  );
};

export default WorkersInfoNote;

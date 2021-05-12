import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'helpers/ThemeManage';

import { mainColors } from 'constants/colors';
import Chevron from 'Icons/Chevron.svg';
import Trash from 'Icons/Trash.svg';
import Rename from 'Icons/Rename.svg';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Actions } from 'ducks';
import { styles } from './styles';
import { GroupWorkerItemProps } from './GroupWorkerItem.type';
import { Typography } from '../Typography';
import { ModalComponent } from '../Modal';
import { Container } from '../Container';
import { Btn } from '../Btn';
import { POSITION_TYPE } from '../Modal/types';

const { width } = Dimensions.get('window');

const GropWorkerItem:React.FC<GroupWorkerItemProps> = ({
  name, count, active, chooseGroup, id, editable, renameAccountHandler,
}) => {
  const [ confirmWindow, setConfirmWindow ] = useState(false);
  const { colors } = useTheme();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const closeModal = () => {
    setConfirmWindow(false);
  };

  const openModal = () => {
    setConfirmWindow(true);
  };

  const deleteGroup = () => {
    dispatch(Actions.Workers.deleteWorkerGroup.request({ groupId: id }));
    closeModal();
  };

  return (
    <>
      { editable ? (
        <View
          style={{ ...styles.container, borderBottomColor: colors.backgroundSelectedItem }}
          onStartShouldSetResponder={ () => true }
        >

          <Typography
            align="left"
            style={{ flexWrap: 'wrap', maxWidth: width - 82 }}
            bold
            color={ (id === -1 || id === 0) ? colors.secondaryText : colors.text }
            text={ name }
          />

          { !(id === -1 || id === 0) && (
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <TouchableOpacity style={{ height: 18, width: 18 }} onPress={ () => renameAccountHandler(id, name) }>
              <Rename fill={ mainColors.blue } />
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 18, width: 18, marginLeft: 10 }} onPress={ openModal }>
              <Trash fill={ mainColors.red } />
            </TouchableOpacity>
          </View>
          )}
        </View>
      )

        : (
          <TouchableOpacity
            style={{ ...styles.container, borderBottomColor: colors.backgroundSelectedItem }}
            onPress={ () => chooseGroup(id) }
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Typography
                bold
                color={ active ? mainColors.blue : colors.text }
                text={ name }
                style={{ flexWrap: 'wrap', maxWidth: width - 80 }}
                align="left"
              />
              <Typography
                style={{ marginLeft: 3 }}
                color={ active ? mainColors.blue : colors.secondaryText }
                text={ `(${count})` }
              />
            </View>
            <View style={{
              transform: [{ rotate: '-90deg' }],
              height: 12,
              width: 12,
            }}
            >
              <Chevron fill={ colors.secondaryText } />

            </View>

          </TouchableOpacity>
        )}

      <ModalComponent
        width={ Dimensions.get('window').width - 16 }
        modalVisible={ confirmWindow }
        setModalVisible={ closeModal }
        position={ POSITION_TYPE.CENTER }
        moreBorder
      >
        <Container
          paddingSize={ 8 }
          style={{
            paddingVertical: 32,
          }}
        >
          <View style={{
            paddingHorizontal: 16,
          }}
          >
            <Typography
              bold
              text={ t('screens.Workers.group.deleteConfirmTitle') }
              color={ colors.text }
              style={{ marginBottom: 20 }}
            />
            <Typography
              text={ t('screens.Workers.group.deleteConfirmText') }
              color={ colors.secondaryText }
              style={{ marginBottom: 42 }}
            />
          </View>

          <Btn
            title={ t('screens.Workers.group.deleteConfirmBtnYes') }
            style={{ marginBottom: 20 }}
            onClick={ deleteGroup }
          />
          <Btn
            title={ t('screens.Workers.group.deleteConfirmBtnNo') }
            onClick={ closeModal }
            style={{ backgroundColor: 'transparent' }}
            textColor={ mainColors.blue }
          />
        </Container>
      </ModalComponent>
    </>
  );
};

export default GropWorkerItem;

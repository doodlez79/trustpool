import React, {
  FC, useEffect, useRef, useState,
} from 'react';

import {
  View, Text, TextInput, Button, Dimensions,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { DataObjectType } from '../ChangeAddressPaymentContent/ChangeAddressPaymentContent.types';
import { Props, DataContentType } from './ChangePasswordModalContent.types';

const { width: deviceWidth } = Dimensions.get('window');

const ChangePasswordModalContent:FC<Props> = ({ submitOldPassword, submitNewPassword }) => {
  const [ password, setPassword ] = useState({ oldPassword: '', newPasswordRepeat: '', newPassword: '' });
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const carouselRef = useRef<Carousel<DataContentType>>(null);

  useEffect(() => {
    if (carouselRef.current) {
      if (currentIndex !== carouselRef.current.currentIndex) {
        carouselRef.current.snapToItem(currentIndex);
      }
    }
  }, [ currentIndex ]);

  const data = [
    {
      id: 1,
      key: 'oldPassword',
      onSubmit: () => submitOldPassword(password.oldPassword, () => setCurrentIndex(1)),
      title: 'Введите старый пароль!',
      data: [
        {
          id: 1,
          placeholder: 'Введите старый пароль!',
          onChangeText: (text: string) => setPassword(s => ({ ...s, oldPassword: text })),
          value: password.oldPassword,

        },
      ],

    },
    {
      id: 2,
      key: 'newPassword',
      onSubmit: () => submitNewPassword(password.newPassword),
      title: 'Введите новый пароль!',
      data: [
        {
          id: 11,
          placeholder: 'Введите новый пароль!',
          onChangeText: (text: string) => setPassword(s => ({ ...s, newPassword: text })),
          value: password.newPassword,

        },
        {
          id: 12,
          placeholder: 'Повторите новый пароль!',
          onChangeText: (text: string) => setPassword(s => ({ ...s, newPasswordRepeat: text })),
          value: password.newPasswordRepeat,
        },
      ],

    },
  ];
  return (
    <Carousel<DataContentType>
      layout="default"
      lockScrollWhileSnapping
      scrollEnabled={ false }
      ref={ carouselRef }
      data={ data }
      // eslint-disable-next-line react/no-unused-prop-types
      renderItem={ ({ item }: {item: DataContentType}) => (
        <View style={{ padding: 10 }}>
          <Text>{item.title}</Text>
          {
            item.data.map(({
              placeholder, onChangeText, value, id,
            }: DataObjectType) => (
              <View key={ id } style={{ margin: 10 }}>
                <TextInput
                  placeholder={ placeholder }
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={ text => onChangeText(text) }
                  value={ value }
                />
              </View>
            ))
            }
          <Button title="Отправить" onPress={ item.onSubmit } />
        </View>
      ) }
      sliderWidth={ deviceWidth }
      itemWidth={ deviceWidth }
    />
  );
};

export default ChangePasswordModalContent;

import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import {
  View, Text, TextInput, Button, Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {
  DataContentTypeAddressPayment,
  Props,
  DataObjectType,
} from './ChangeAddressPaymentContent.types';

const { width: deviceWidth } = Dimensions.get('window');

const ChangeAddressPaymentContent:FC<Props> = ({ onGetCode, onSubmitCode, onSubmitAddressPayment }) => {
  const [ code, setCode ] = useState('');
  const [ addressPayment, setAddressPayment ] = useState('');
  const [ currentIndex, setCurrentIndex ] = useState(0);

  const carouselRef = useRef<Carousel<DataContentTypeAddressPayment>>(null);

  useEffect(() => {
    if (carouselRef.current && currentIndex !== carouselRef.current.currentIndex) {
      carouselRef.current.snapToItem(currentIndex);
    }
  }, [ currentIndex ]);

  const data: DataContentTypeAddressPayment[] = [
    {
      id: 1,
      key: 'code',
      onGetCode,
      onSubmit: () => onSubmitCode(code, () => setCurrentIndex(1)),
      title: 'Введите код!',
      data: [
        {
          id: 1,
          placeholder: 'Введите код пароль!',
          onChangeText: (text: string) => setCode(text),
          value: code,

        },
      ],
    },
    {
      id: 2,
      key: 'newAddress',
      onSubmit: () => onSubmitAddressPayment(addressPayment),
      title: 'Введите аддрес кошелька!',
      data: [
        {
          id: 11,
          placeholder: 'Введите новый пароль!',
          onChangeText: (text: string) => setAddressPayment(text),
          value: addressPayment,

        },
      ],
    },
  ];

  return (
    <Carousel<DataContentTypeAddressPayment>
      layout="default"
      lockScrollWhileSnapping
      scrollEnabled={ false }
      ref={ carouselRef }
      data={ data }
      /* @ts-ignore */
      renderItem={ ({ item }) => (
        <View style={{ padding: 10 }}>
          <Text>{item.title}</Text>
          {
            item.onGetCode && (
              <Button title="Получить код" onPress={ item.onGetCode } />
            )
          }
          {
            item.data.map((item: DataObjectType) => (
              <View key={ item.id } style={{ margin: 10 }}>
                <TextInput
                  placeholder={ item.placeholder }
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={ text => item.onChangeText(text) }
                  value={ item.value }
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

export default ChangeAddressPaymentContent;

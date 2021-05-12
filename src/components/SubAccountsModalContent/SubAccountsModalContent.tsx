import React, {
  FC, useEffect, useRef, useState,
} from 'react';

import {
  Dimensions,
} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { ModalContentAccountsList } from 'components/ModalContentAccountsList';

import { DataType, SubAccountsModalContentProps } from './SubAccountsModalContent.types';
// eslint-disable-next-line max-len
import CreateSubAccountWorkerGroupContent from '../CreateSubAccountWorkerGroupContent/CreateSubAccountWorkerGroupContent';

const { width: deviceWidth } = Dimensions.get('window');

const SubAccountsModalContent:FC<SubAccountsModalContentProps> = ({
  addSubAccounts, currentNameId,
  accounts, onSelectSubAccounts, loading, errorSubAccountForm, setErrorSubAccount,
}) => {
  const carouselRef = useRef<Carousel<DataType>>(null);
  const [ currentIndex, setCurrentIndex ] = useState(0);

  useEffect(() => {
    if (carouselRef.current && currentIndex !== carouselRef.current.currentIndex) {
      carouselRef.current.snapToItem(currentIndex);
    }
  }, [ currentIndex ]);

  const data = [
    {
      id: 1,
      component: <ModalContentAccountsList
        loading={ loading }
        addAccountHandler={ () => setCurrentIndex(1) }
        selectedItemSubAccount={ onSelectSubAccounts }
        data={ accounts }
        currentNameId={ currentNameId }
      />,
    },
    {
      id: 2,
      component: <CreateSubAccountWorkerGroupContent
        loading={ loading }
        setErrorSubAccount={ setErrorSubAccount }
        errorSubAccountForm={ errorSubAccountForm }
        onPressBack={ () => setCurrentIndex(0) }
        addSubAccounts={ (data, resetForm) => addSubAccounts(data, () => { setCurrentIndex(0); resetForm(); }) }
      />,

    },
  ];
  return (
    <Carousel<DataType>
      layout="default"
      lockScrollWhileSnapping
      scrollEnabled={ false }
      ref={ carouselRef }
      data={ data }
      renderItem={ ({ item }: any) => (
        item.component
      ) }
      sliderWidth={ deviceWidth }
      itemWidth={ deviceWidth }
    />
  );
};

export default SubAccountsModalContent;

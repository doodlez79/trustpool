import React, { useEffect, useRef, useState } from 'react';

import { Dimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { useDispatch } from 'react-redux';
import { Actions } from 'ducks';

import { GroupModalProps, DataType } from './GroupModalSelect.types';

import { GroupWorkersList } from '../GroupWorkersList';

// eslint-disable-next-line max-len
import CreateSubAccountWorkerGroupContent from '../CreateSubAccountWorkerGroupContent/CreateSubAccountWorkerGroupContent';

const { width: deviceWidth } = Dimensions.get('window');

const GroupModalSelect:React.FC<GroupModalProps> = ({
  id, groups, chooseGroup, loading,
}) => {
  const carouselRef = useRef<Carousel<DataType>>(null);
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const [ errorGroupAddForm, setErrorGroupAddForm ] = useState(0);
  const [ dataOfRenameInfo, setDataOfRenameInfo ] = useState({ name: '', id: 0 });

  const dispatch = useDispatch();

  const addWorkerGroup = (name: string, cb: () => void) => {
    dispatch(Actions.Workers.addWorkerGroup.request({ name },
      { resolve: () => cb(), reject: (code: number) => setErrorGroupAddForm(code) }));
  };

  const renameWorkerGroup = (name: string, cb: () => void) => {
    dispatch(Actions.Workers.renameWorkerGroup.request({ name, id: dataOfRenameInfo.id },
      { resolve: () => { cb(); }, reject: (code: number) => setErrorGroupAddForm(code) }));
  };

  useEffect(() => {
    if (carouselRef.current && currentIndex !== carouselRef.current.currentIndex) {
      carouselRef.current.snapToItem(currentIndex);
    }
  }, [ currentIndex ]);

  const data = [
    {
      id: 1,
      component:
  <GroupWorkersList
    id={ id }
    groups={ groups }
    loading={ loading }
    chooseGroup={ id => chooseGroup(id) }
    addAccountHandler={ () => { setCurrentIndex(1); setDataOfRenameInfo({ name: '', id: 0 }); } }
    renameAccountHandler={ (id, name) => { setDataOfRenameInfo({ id, name }); setCurrentIndex(1); } }
  />,
    },
    {
      id: 2,
      component:
      dataOfRenameInfo.name ? (
        <CreateSubAccountWorkerGroupContent
          loading={ loading }
          setErrorSubAccount={ setErrorGroupAddForm }
          errorSubAccountForm={ errorGroupAddForm }
          onPressBack={ () => { setCurrentIndex(0); setDataOfRenameInfo({ name: '', id: 0 }); } }
          addSubAccounts={ data => {
            renameWorkerGroup(data, () => setCurrentIndex(0));
            setDataOfRenameInfo({ name: data, id: 0 });
          } }
          name={ dataOfRenameInfo.name }
          workersGroup
        />
      ) : (
        <CreateSubAccountWorkerGroupContent
          loading={ loading }
          setErrorSubAccount={ setErrorGroupAddForm }
          errorSubAccountForm={ errorGroupAddForm }
          onPressBack={ () => { setCurrentIndex(0); setDataOfRenameInfo({ name: '', id: 0 }); } }
          addSubAccounts={ data => addWorkerGroup(data, () => setCurrentIndex(0)) }
          workersGroup
        />
      ),
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

export default GroupModalSelect;

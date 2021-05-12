import React, { useEffect, useRef, useState } from 'react';
import { WorkersGroupState } from 'entitiesState/workers';

import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { MoreGroupWorkerComponent } from '../MoreGroupWorkerComponent';
import { MovedToGroupWorkerComponent } from '../MovedToGroupWorkerComponent';

const { width: deviceWidth } = Dimensions.get('window');

type Props = {
  groups: WorkersGroupState[]
  closeModal: ()=>void
  currentIdGroup: number
  moveToGroup: (id:number) => void
  selectAll: ()=>void
  unSelectAll: ()=>void
}

type DataType = {
  id: number,
  component: React.ReactNode
}

const ModalMovedGroupWorkers:React.FC<Props> = ({
  groups, closeModal, currentIdGroup, moveToGroup,
  selectAll, unSelectAll,
}) => {
  const carouselRef = useRef<Carousel<DataType>>(null);

  const [ currentIndex, setCurrentIndex ] = useState(0);

  const data = [
    {
      id: 1,
      component:
  <MoreGroupWorkerComponent
    selectAll={ selectAll }
    unSelectAll={ unSelectAll }
    toMoveList={ () => setCurrentIndex(1) }
  />,
    },
    {
      id: 2,
      component:
  <MovedToGroupWorkerComponent
    moveToGroup={ id => moveToGroup(id) }
    groups={ groups }
    closeModal={ closeModal }
    currentIdGroup={ currentIdGroup }
  />,

    },
  ];

  useEffect(() => {
    if (carouselRef.current && currentIndex !== carouselRef.current.currentIndex) {
      carouselRef.current.snapToItem(currentIndex);
    }
  }, [ currentIndex ]);

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

export default ModalMovedGroupWorkers;

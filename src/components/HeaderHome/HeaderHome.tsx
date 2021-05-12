import React, { FC } from 'react';

import { Container } from 'components/Container';
import { SelectorList } from 'components/SelectorList';
import { BurgerBtn } from 'components/BurgerBtn';

import { styles } from './styles';
import { HeaderHomeProps } from './types';

const HeaderHome:FC<HeaderHomeProps> = ({
  onLeftIconClick, onRightIconClick, modalOpen, currentUserName = 'currentUserName',
}) => (
  <Container
    paddingSize={ 16 }
    style={ styles.container }
  >
    <BurgerBtn onPress={ onLeftIconClick } />
    <SelectorList active={ modalOpen } username={ currentUserName } onClick={ onRightIconClick } />

  </Container>
);

export default HeaderHome;

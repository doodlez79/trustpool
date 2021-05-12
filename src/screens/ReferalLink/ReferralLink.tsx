import React from 'react';
import { View } from 'react-native';
import { ReferalsInfoBlock } from 'components/ReferalsInfoBlock';
import { ReferralRulesBlock } from 'components/ReferralRulesBlock';
import { useSelector } from 'react-redux';
import { Selectors } from 'ducks';
import { Container } from 'components/Container';

const ReferralList:React.FC = () => {
  const CurrentUserInfo = useSelector(Selectors.Account.getAccountInfo);

  return (
    <Container paddingSize={ 16 }>
      <ReferalsInfoBlock
        onRefresh={ () => {} }
        userId={ CurrentUserInfo.id }
      />
      <View>
        <ReferralRulesBlock />
      </View>
    </Container>
  );
};

export default ReferralList;

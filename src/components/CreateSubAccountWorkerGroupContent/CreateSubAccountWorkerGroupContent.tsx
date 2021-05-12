import React, { FC } from 'react';

import { View, TouchableOpacity } from 'react-native';

import { ModalHeader } from 'components/ModalHeader';
import { Typography } from 'components/Typography';
import { mainColors } from 'constants/colors';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { InputField } from 'components/InputField';
import { Btn } from 'components/Btn';
import Back from 'Icons/Back.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container } from 'components/Container';
import { perfectSize } from 'helpers/PerfectSize';

type CreateSubAccountWorkerGroupContentProps = {
  onPressBack: () => void
  addSubAccounts: (name: string) => void
  errorSubAccountForm: number
  setErrorSubAccount: (code: number) => void
  loading: boolean
  workersGroup?:boolean
  name? : string
}
const CreateSubAccountWorkerGroupContent: FC<CreateSubAccountWorkerGroupContentProps> = ({
  onPressBack, addSubAccounts, setErrorSubAccount,
  errorSubAccountForm, loading, workersGroup, name,
}) => {
  const { t } = useTranslation();
  const inset = useSafeAreaInsets();
  const correctTitle = () => {
    if (name) {
      return t('screens.Workers.group.createGroup.headerRename');
    }

    if (workersGroup) {
      return t('screens.Workers.group.createGroup.header');
    }
    return t('screens.Home.accountAddModalTitle');
  };
  return (
    <View style={{
      flex: 1,
    }}
    >
      <ModalHeader
        title={ correctTitle() }
        leftContent={ (
          <TouchableOpacity
            onPress={ onPressBack }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View style={{
              height: perfectSize(16),
              width: perfectSize(16),
            }}
            >
              <Back fill={ mainColors.blue } />
            </View>

            <Typography
              color={ mainColors.blue }
              text={ t('screens.Home.accountModalBackBtn') }
            />
          </TouchableOpacity>
          ) }
      />
      <Container
        paddingSize={ 16 }
        style={{
          flex: 1,
          marginVertical: perfectSize(54),
        }}
      >
        <Formik
          initialValues={{ subAccountName: name || '' }}
          onSubmit={ values => {
            addSubAccounts(values.subAccountName);
          } }
          enableReinitialize
        >
          {
            ({
              values, setFieldValue, handleSubmit, dirty,
            }) => (
              <View style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingBottom: inset.bottom,
              }}
              >
                <View>
                  <InputField
                    error={ errorSubAccountForm > 0 ? errorSubAccountForm : '' }
                    onChange={ text => {
                      if (errorSubAccountForm > 0) {
                        setErrorSubAccount(0);
                      }
                      setFieldValue('subAccountName', text);
                    } }
                    value={ values.subAccountName }
                    label={ workersGroup
                      ? t('screens.Workers.group.createGroup.label') : t('screens.Home.modalChangeAccountInputLabel') }
                    inputProps={{
                      maxLength: 30,
                    }}
                  />
                  {
                    errorSubAccountForm > 0 && (
                      <Typography
                        text={ workersGroup
                          ? t(`screens.Workers.group.errors.${errorSubAccountForm}`)
                          : t(`screens.Home.errors.${errorSubAccountForm}`) }
                        color={ mainColors.red }
                        fontSize={ 14 }
                        align="left"
                      />
                    )
                  }
                </View>

                <Btn
                  loading={ loading }
                  onClick={ handleSubmit }
                  disabled={ !dirty }
                  title={ t('screens.Home.modalChangeAccountBtn') }
                />
              </View>

            )
          }

        </Formik>
      </Container>

    </View>
  );
};

export default React.memo(CreateSubAccountWorkerGroupContent);

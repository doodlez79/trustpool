import * as yup from 'yup';

export const schemaChangePass = (password: string, valueGA: string, googleAuthFlag: boolean) => yup.object().shape({
  valuePassword: yup.string().required(password),
  valueGA: googleAuthFlag ? yup.string().required(valueGA) : yup.string(),
});

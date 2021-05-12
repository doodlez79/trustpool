import * as Yup from 'yup';

export const validationSchema = (passwordErrorText: string, repeatErrorText: string) => Yup.object({
  password: Yup.string().required(passwordErrorText),
  repeatPassword: Yup.string()
    .oneOf([ Yup.ref('password'), null ], repeatErrorText).required(),
});

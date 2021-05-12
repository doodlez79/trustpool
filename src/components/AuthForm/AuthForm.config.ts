import * as yup from 'yup';

type TypeTextPassword = {
  required: string
  min: string
  max: string
}

type TypeTestEmail = { required: string, incorrect: string}

export const schema = (password: TypeTextPassword, email: TypeTestEmail) => yup.object().shape({
  email: yup.string().trim().required(email.required).email(email.incorrect),
  password: yup.string().min(6, password.min).max(30, password.max).required(password.required),
});

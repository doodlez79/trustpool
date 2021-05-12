export type AuthFormProps = {
  setFormData: (values: { email: string, password: string }) => void
  setModalCaptcha: (value: boolean) => void
  errorCode: number,
  disableBtn: boolean
  loading: boolean
  setErrors: (code: number) => void
}

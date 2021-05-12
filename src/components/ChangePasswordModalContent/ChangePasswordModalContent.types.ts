export type Props = {
  submitOldPassword: (value: string, cb: () => void) => void
  submitNewPassword: (value: string) => void
}

export type DataContentType = {
  id: number,
  key: string,
  onSubmit: () => void,
  title: string,
  data: {id: number, placeholder: string, onChangeText: (text:string) => void, value: string}[]
}

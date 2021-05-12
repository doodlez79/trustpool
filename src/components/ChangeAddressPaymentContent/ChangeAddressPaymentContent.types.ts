export type DataObjectType = {id: number, placeholder: string, onChangeText: (text:string) => void, value: string}

export type DataContentTypeAddressPayment = {
  id: number,
  key: string,
  onGetCode?: () => void,
  onSubmit: () => void,
  title: string,
  data: DataObjectType[]
}
export type Props = {
  onGetCode: () => void
  onSubmitCode: (code: string, cb:() => void) => void
  onSubmitAddressPayment: (address: string) => void
}

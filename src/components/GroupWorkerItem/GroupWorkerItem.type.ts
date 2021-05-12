export type GroupWorkerItemProps = {
  name: string,
  id: number,
  active: boolean,
  count: number,
  chooseGroup?:(id: number)=> void
  editable?: boolean
  renameAccountHandler?: (id:number, name: string)=>void
}

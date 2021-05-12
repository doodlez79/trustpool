import { WorkersGroupState } from 'entitiesState/workers';

export type GroupListProps = {
  id:number,
  groups: WorkersGroupState[]
  chooseGroup?: (id: number)=>void
  loading: boolean
  addAccountHandler?: () => void
  renameAccountHandler?: (id: number, name: string, cb?: ()=>void) => void
}

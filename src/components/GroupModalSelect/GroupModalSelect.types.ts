import { WorkersGroupState } from 'entitiesState/workers';

export type GroupModalProps = {
  id:number,
  groups: WorkersGroupState[]
  chooseGroup?: (id: number)=>void
  loading: boolean
}

export type DataType = {
  id: number,
  component: React.ReactNode
}

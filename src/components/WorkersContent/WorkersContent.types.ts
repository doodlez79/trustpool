import { WorkerItem, WorkersStateType } from 'entitiesState/workers';
import { WORKERS_CONTENT_TYPE } from 'screens/Workers/Workers.types';
import { COIN_TYPE } from 'entitiesState/currency';
import { PageInfo } from 'types/pageInfo';

export type WorkersContentProps = {
  status: WORKERS_CONTENT_TYPE
  data: WorkerItem[]
  onClick: (item: WorkerItem)=>void
  updateWorkers: (page: number, replace:boolean) => void
  active: boolean

  firstVisit: boolean
  onPress: () => void
  coin: COIN_TYPE,
  meta: PageInfo

  moveToClick:()=>void

  openModalCoin: () => void
  coinModal: boolean

  loading: boolean
  selectableItem: boolean
  setSelectableItem: (val:boolean) => void
  setWorkerIdForMoving : (val: number[])=>void
  workerIdforMoving: number[]
  moreAndMoveModal: boolean
  groupValue: number
  goToAllWorkers: ()=>void
  sortConfig: WorkersStateType['sortConfig']
  allWorkerslength:number
}

export type SearchAndSortWorkersTabProps = {
  value: string,
  sortClick: ()=>void,
  setChangeSearch: (e:string)=>void
  setChangeSearch1: (e:string)=>void
  activeSort: {orderBy: string, sortBy: string}
  loading: boolean
  searchActive: boolean,
  setSearchActive: (val:boolean) => void
  placeholderNameGroup:string
  clearInput:()=>void
}

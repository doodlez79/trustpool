export type WorkerSortModalProps = {
  loading :boolean
  sort: {sortBy: string, orderBy: string},
  setChangeSort: (sort: {sortBy: string, orderBy: string})=>void
  resetSort: () => void
}

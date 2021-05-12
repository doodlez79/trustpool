import { WorkerItem, WorkersGroupState } from 'entitiesState/workers';

import mapper from 'helpers/Mapper';
import { PageInfo } from 'types/pageInfo';

import { ERROR_ACTIONS } from 'types/ActionTypes';
import validationResponseFromApi from 'helpers/ValidationResponseFromApi';
import { ChartType, GET_CHARTS_REQUEST_TYPE } from 'types/chart';
import { TIME_CHART_TYPES } from 'entitiesState/general';
import { COIN_TYPE } from 'entitiesState/currency';
import { APIService } from '../API';
import {
  mapperSchemaPageInfo, mapperSchemaWorkerInfo, mapperSchemaWorkerItem, mapperSchemaWorkersGroup,
} from './ShemaMapper';
import {
  schemaGetWorkerInfoResponse, schemaGetWorkersResponse, schemaPageInfoResponse, schemaGetWorkersGroupResponse,
} from './SchemaType';

export default class WorkersServices {
  constructor(private readonly apiService: APIService) {}

  getWorkers({
    coin, page, searchValue, sortValue, status, group,
  }: { coin: COIN_TYPE, page: number, searchValue:string, group: number,
    sortValue: {sortBy: string, orderBy:string}, status: string }) {
    return this.apiService.get(`/pool/${coin}/worker/group/${group}?`,
      {
        limit: 10,
        page,
        worker_name: searchValue || undefined,

        // todo:  Поправить!!!!!
        // eslint-disable-next-line no-nested-ternary
        sort_by: sortValue ? sortValue.sortBy ? sortValue.sortBy : undefined : undefined,
        // eslint-disable-next-line no-nested-ternary
        sort_order: sortValue ? sortValue.orderBy ? sortValue.orderBy : undefined : undefined,
        status: status || undefined,
      }).then(res => {
      const { data, ...pageInfo } = res;
      const newData = data.map((item: object) => mapper<WorkerItem>(item, mapperSchemaWorkerItem)) as WorkerItem[];
      const newPageInfo = mapper<PageInfo>(pageInfo, mapperSchemaPageInfo);
      const validateData = validationResponseFromApi<WorkerItem[]>(schemaGetWorkersResponse);
      const validatePageInfo = validationResponseFromApi<PageInfo>(schemaPageInfoResponse);

      const validData = validateData(newData);
      const validPageInfo = validatePageInfo(newPageInfo);

      if (!validData || !validPageInfo) {
        const error = { ...validateData.errors, ...validatePageInfo.errors, type: ERROR_ACTIONS.VALIDATION };
        throw (error);
      }
      return { workers: newData, pageInfo: newPageInfo };
    }).catch(e => {
      throw e;
    });
  }

  getWorker({ id, time = TIME_CHART_TYPES.HOUR, coin = 'BTC' }: GET_CHARTS_REQUEST_TYPE) {
    return this.apiService.get(`/pool/${coin}/worker/${id}/hashrate/${time}/chart`, {}).then(res => {
      const { length } = res.hashrate;
      const newData = mapper<ChartType>(res, mapperSchemaWorkerInfo(time, length));
      const validateData = validationResponseFromApi<ChartType>(schemaGetWorkerInfoResponse);
      const validData = validateData(newData);
      if (!validData) {
        const error = { ...validateData.errors, type: ERROR_ACTIONS.VALIDATION };
        throw (error);
      }
      return { ...newData };
    }).catch(e => {
      throw e;
    });
  }

  getWorkersGroup({ coin } : {coin:COIN_TYPE}) {
    return this.apiService.get(`/pool/${coin}/worker/group`).then(res => {
      // eslint-disable-next-line max-len
      const newData = res.map((item: object) => mapper<WorkersGroupState>(item, mapperSchemaWorkersGroup))as WorkersGroupState[];

      const validateData = validationResponseFromApi<WorkersGroupState>(schemaGetWorkersGroupResponse);
      const validData = validateData(newData);
      if (!validData) {
        const error = { ...validateData.errors, type: ERROR_ACTIONS.VALIDATION };
        throw (error);
      }
      return newData;
    }).catch(e => {
      throw e;
    });
  }

  deleteWorkerGroup({ coin, groupId } : {coin:COIN_TYPE, groupId:number}) {
    return this.apiService.delete(`/pool/${coin}/worker/group?group_id=${groupId}`).then(res => res).catch(e => {
      throw e;
    });
  }

  addWorkerGroup({ coin, name } : {coin:COIN_TYPE, name:string}) {
    return this.apiService.post(`/pool/${coin}/worker/group`, { group_name: name }).then(res => res).catch(e => {
      throw e;
    });
  }

  renameWorkerGroup({ coin, name, id } : {coin:COIN_TYPE, name:string, id: number}) {
    return this.apiService.put(`/pool/${coin}/worker/group`, { group_id: id, group_name: name })
      .then(res => res).catch(e => {
        throw e;
      });
  }

  moveItemToNewGroup({ group, elements } : { group:number, elements: number[]}) {
    return this.apiService.put('/pool/worker', { group_id: group, worker_ids: JSON.stringify(elements) })
      .then(res => res).catch(e => {
        throw e;
      });
  }
}

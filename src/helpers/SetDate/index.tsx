import { parseISO } from 'date-fns';

const arrayFields = [ 'lastActive', 'endAt', 'createdAt', 'updatedAt', 'birthDate', 'depositAfter' ];

// @ts-ignore
export const setDateMap = (state: any) => {
  if (Array.isArray(state)) {
    return state.map(item => setDateMap(item));
  }

  if (state && typeof state === 'object') {
    return Object.keys(state).reduce((acc, key) => {
      if (Array.isArray(state[key])) {
        return { ...acc, [key]: state[key].map((item: any) => setDateMap(item)) };
      } if (state[key] && typeof state[key] === 'object') {
        return { ...acc, [key]: setDateMap(state[key]) };
      }
      if (arrayFields.includes(key)) {
        return { ...acc, [key]: state[key] ? parseISO(state[key]) : state[key] };
      }

      return { ...acc, [key]: state[key] };
    }, {});
  }

  return state;
};

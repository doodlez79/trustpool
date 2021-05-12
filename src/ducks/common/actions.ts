import { createActionCreator } from 'deox';

const rootPrefix = '@common';

export const reset = createActionCreator(
  `${rootPrefix}/reset`,
  resolve => (payload?: boolean) => resolve(payload),
);

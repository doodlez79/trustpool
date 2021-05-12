export const generateAsyncActions = (prefix: string) => ({
  REQUEST: `${prefix}/REQUEST`,
  SUCCESSED: `${prefix}/SUCCESSED`,
  FAILED_NETWORK: `${prefix}/FAILED_NETWORK`,
  FAILED: `${prefix}/FAILED`,
  FAILED_VALIDATION: `${prefix}/FAILED_VALIDATION`,
});

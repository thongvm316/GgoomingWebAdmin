import * as actionTypes from './types'

export const getListReportBlockManagingAction = (payload) => {
  return {
    type: actionTypes.GET_LIST_REPORT_BLOCK_MANAGING,
    payload: payload,
  }
}

export const reportBlockManagingRequestWithError = (payload) => {
  return {
    type: actionTypes.REPORT_BLOCK_MANAGING_REQUEST_ERROR,
    payload: payload,
  }
}

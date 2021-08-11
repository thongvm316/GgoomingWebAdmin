import * as actionTypes from './types'

export const getListReportBlockManagingAction = (payload) => {
  return {
    type: actionTypes.GET_LIST_REPORT_BLOCK_MANAGING,
    payload: payload,
  }
}

export const getReportBlockDetailAction = (payload) => {
  return {
    type: actionTypes.GET_REPORT_BLOCK_DETAIL,
    payload: payload,
  }
}

export const getHistoryReportedInReportBlockDetailAction = (payload) => {
  return {
    type: actionTypes.GET_HISTORY_REPORTED_IN_REPORT_BLOCK_DETAIL,
    payload: payload,
  }
}

export const getHistoryReportedDetailAction = (payload) => {
  return {
    type: actionTypes.GET_HISTORY_REPORTED_DETAIL,
    payload: payload,
  }
}

export const reportBlockManagingRequestWithError = (payload) => {
  return {
    type: actionTypes.REPORT_BLOCK_MANAGING_REQUEST_ERROR,
    payload: payload,
  }
}

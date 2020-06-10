import * as types from '../constants/pricing'

export const setPlans = (data) => ({ type: types.SET_PLANS, data: data });
export const setServices = (data) => ({ type: types.SET_SERVICES, data: data });
export const setDiscounts = (data) => ({ type: types.SET_DISCOUNTS, data: data });
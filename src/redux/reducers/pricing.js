import { SET_PLANS, SET_SERVICES, SET_DISCOUNTS } from '../constants/pricing'

const initialState = {
  plans: [
    {
      transactions: 100,
      price: 49
    },
    {
      transactions: 1000,
      price: 99
    },
    {
      transactions: 3000,
      price: 199
    }
  ],
  services: [
    {
      name: 'Review assistance',
      desc: 'Lorem ipsum...',
      price: 99
    },
    {
      name: 'Priority support',
      desc: 'Lorem ipsum...',
      price: 199
    }
  ],
  discounts: [
    {
      minimum_reports: 1,
      discount: 50,
    },
    {
      minimum_reports: 2,
      discount: 75
    }
  ]
}

export default function pricing(state = initialState, action) {
  switch (action.type) {
    case SET_PLANS:
      return {
        ...state,
        plans: action.data,
      };
    case SET_SERVICES:
      return  {
        ...state,
        services: action.data,
      } ;
    case SET_DISCOUNTS:
      return  {
        ...state,
        discounts: action.data,
      } ;
    default:
      return state
  }
}
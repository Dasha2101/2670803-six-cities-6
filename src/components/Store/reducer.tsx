import { Offer } from '../../mocks/types/offer';
import { SortingOption } from '../SortOptions/sortOptions';

export type StateType = {
  city: string;
  offers: Offer[];
  sortOption: SortingOption;
};

export const initialState: StateType = {
  city: 'Paris',
  offers: [],
  sortOption: 'Popular',
};

type SetCityAction = {
  type: 'SET_CITY';
  payload: string;
};

type SetOffersAction = {
  type: 'SET_OFFERS';
  payload: Offer[];
};

type SetSortAction = {
  type: 'SET_SORT';
  payload: SortingOption;
};

export type ActionType = SetCityAction | SetOffersAction | SetSortAction;

export const reducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case 'SET_CITY':
      return { ...state, city: action.payload };
    case 'SET_OFFERS':
      return { ...state, offers: action.payload };
    case 'SET_SORT':
      return { ...state, sortOption: action.payload };
    default:
      return state;
  }
};

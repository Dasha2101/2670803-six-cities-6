import { Offer } from '../../mocks/types/offer';
import { SortingOption } from '../SortOptions/sortOptions';

export const SET_CITY = 'SET_CITY' as const;
export const SET_OFFERS = 'SET_OFFERS' as const;
export const SET_SORT = 'SET_SORT' as const;

export const setCity = (city: string) => ({
  type: SET_CITY,
  payload: city,
});

export const setOffers = (offers: Offer[]) => ({
  type: SET_OFFERS,
  payload: offers,
});

export const setSort = (sortOption: SortingOption) => ({
  type: SET_SORT,
  payload: sortOption,
});

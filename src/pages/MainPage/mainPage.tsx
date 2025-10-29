import { FC, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import OfferList from '../../components/OfferList/offerList';
import OfferMap from '../../components/Map/map';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../components/Store';
import { setCity, setSort } from '../../components/Store/action';
import CityList from '../../components/CityList/cityList';
import SortingOptions, { SortingOption } from '../../components/SortOptions/sortOptions';

const MainPage: FC = () => {
  const dispatch = useDispatch();
  const currentCity = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const currentSort: SortingOption = useSelector((state: RootState) => state.sortOption);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

  const filtrOffers = offers.filter((offer) => offer.city === currentCity);
  const sortedOffers = useMemo(() => {
    switch (currentSort) {
      case 'Price: low to high':
        return [...filtrOffers].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...filtrOffers].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...filtrOffers].sort((a, b) => b.rating - a.rating);
      default:
        return filtrOffers;
    }
  }, [filtrOffers, currentSort]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList
            cities={cities}
            currentCity={currentCity}
            onCityChange={(city) => dispatch(setCity(city))}
          />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">
                {filtrOffers.length} places to stay in {currentCity}
              </b>
              <SortingOptions
                currentOption={currentSort}
                onChange={(option: SortingOption) => dispatch(setSort(option))}
              />
              <OfferList
                offers={sortedOffers}
                activeOfferId={activeOfferId}
                onOfferHover={(id: string | null) => setActiveOfferId(id)}
              />
            </section>
            <div className="cities__right-section">
              <OfferMap
                offers={sortedOffers}
                activeOfferId={activeOfferId}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;

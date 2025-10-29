import { FC, useState } from 'react';

export type SortingOption = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

type SortingOptionProps = {
  currentOption: SortingOption;
  onChange: (option: SortingOption) => void;
};

const SortingOptions: FC<SortingOptionProps> = ({ currentOption, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options: SortingOption[] = [
    'Popular',
    'Price: low to high',
    'Price: high to low',
    'Top rated first',
  ];

  const handleOptionClick = (option: SortingOption) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>{' '}
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {currentOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {options.map((option) => (
            <li
              key={option}
              className={`places__option ${option === currentOption ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SortingOptions;

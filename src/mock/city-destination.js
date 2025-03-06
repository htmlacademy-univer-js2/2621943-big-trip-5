import {getRandomElement, getRandomNumber} from '../utils.js';

const mockCityDestinations = [
  {
    id: 1,
    description: 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    name: 'Moscow',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Moscow'
      }
    ]
  },
  {
    id: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    name: 'Berlin',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Berlin'
      }
    ]
  },
  {
    id: 3,
    description: 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    name: 'Paris',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Paris'
      }
    ]
  },
  {
    id: 4,
    description: 'Nunc fermentum tortor ac porta dapibus.',
    name: 'Stockholm',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'Stockholm'
      }
    ]
  },
  {
    id: 5,
    description: 'Fusce tristique felis at fermentum pharetra.',
    name: 'London',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber()}`,
        description: 'London'
      }
    ]
  },
];

function getRandomCityDestination() {
  return getRandomElement(mockCityDestinations);
}

export {getRandomCityDestination};

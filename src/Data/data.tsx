const img1 = require('../../assets/food-pic.png');
const img2 = require('../../assets/image2.png');
const resType = require('../../assets/background-login.png');
const backIcon = require('../../assets/back.png');

const foodPic = require('../../assets/food-pic-small1.png');

const catRes1 = require('../../assets/food-pic-small.png');
const catRes2 = require('../../assets/cayla1-150730-unsplash.png');
const catRes3 = require('../../assets/monika-grabkowska-759473-unsplash.png');
const catRes4 = require('../../assets/brooke-lark-230140-unsplash.png');

export const resDetails = [
  {
    id: '1',
    name: 'Kricket Brixton',
    address: '1901 Ventura Blxd Oxnard',
    rating: 4.9,
    img: img1,
    ratingNo: '(149 ratings)',
  },
  {
    id: '2',
    name: 'Pureto Vallarta',
    address: '1901 Ventura Blxd Oxnard',
    img: img2,
    rating: 4.9,
    ratingNo: '(129 ratings)',
  },
  {
    id: '3',
    name: 'Vallarta',
    address: '1901 Ventura Blxd Oxnard',
    rating: 4.1,
    img: img1,
    ratingNo: '(129 ratings)',
  },
];

export const popularFood = [
  {
    id: '1',
    name: 'Prosciutto Rucola',
    img: foodPic,
    price: '$ 12.88',
  },
  {
    id: '2',
    name: 'Uramaki Set',
    img: foodPic,
    price: '$ 9.88',
  },
];

export const foodItems = [
  {
    id: '1',
    name: 'Special pulaw',
    price: '$ 9.88',
  },
  {
    id: '2',
    name: 'Lemon Spagg',
    price: '$ 12.88',
  },
  {
    id: '3',
    name: 'Poyez Yolun Kenaryndaky Fitchi',
    price: '$ 12.88',
  },
  {
    id: '4',
    name: 'Chicken Lollipop',
    price: '$ 9.88',
  },
  {
    id: '5',
    name: 'Chicken Kebab',
    price: '$ 12.88',
  },
  {
    id: '6',
    name: 'Special pulaw',
    price: '$ 9.88',
  },
  {
    id: '7',
    name: 'Lemon Spagg',
    price: '$ 12.88',
  },
  {
    id: '8',
    name: 'Poyez Yolun Kenaryndaky Fitchi',
    price: '$ 12.88',
  },
  {
    id: '9',
    name: 'Chicken Lollipop',
    price: '$ 9.88',
  },
  {
    id: '10',
    name: 'Chicken Kebab',
    price: '$ 12.88',
  },
];

export const couponsCode = [
  {
    id: '1',
    card: 'Citi Bank Cards',
    offer1: 'Get 50% off on order above Rs 350',
    offer2: 'and Get 20% off above Rs 200',
    code: 'FZCGFRT',
  },
  {
    id: '2',
    card: 'PAYZAPP 100',
    offer1: 'Get 50% off on order above Rs 350',
    offer2: 'and Get 20% off above Rs 200',
    code: 'FZCGFRT',
  },
];

export const resTypes = [
  {
    id: '1',
    img: resType,
    cat: 'Turkish',
    icon: backIcon,
  },
  {
    id: '2',
    img: resType,
    cat: 'Turkish',
    icon: backIcon,
  },
  {
    id: '3',
    img: resType,
    cat: 'Turkish',
    icon: backIcon,
  },
];

export const catResDetails = [
  {
    id: '1',
    name: 'Kricket Brixton',
    name1: 'Berkarar Mall',
    address: '1901 Ventura Blxd Oxnard',
    rating: 4.9,
    img: catRes1,
    ratingNo: '(149 ratings)',
  },
  {
    id: '2',
    name: 'Pureto Vallarta',
    name1: 'Restaurant',
    address: '1901 Ventura Blxd Oxnard',
    img: catRes2,
    rating: 4.9,
    ratingNo: '(129 ratings)',
  },
  {
    id: '3',
    name: 'Venich Beach',
    name1: 'Soup',
    address: '1901 Ventura Blxd Oxnard',
    rating: 4.1,
    img: catRes3,
    ratingNo: '(129 ratings)',
  },
  {
    id: '4',
    name: 'Vallarta',
    name1: 'Club Street',
    address: '1901 Ventura Blxd Oxnard',
    rating: 4.1,
    img: catRes4,
    ratingNo: '(129 ratings)',
  },
];

export const pastOrders = [
  {
    id: '123',
    name: 'Kricket Brixton',
    name1: 'Berkarar Mall',
    address: '1901 Ventura Blxd Oxnard',
    img: catRes1,
    fooditems: [
      {
        id: '44',
        name: 'Chicken Lollipop',
        itemNo: 2,
        price: '$ 9.88',
      },
      {
        id: '55',
        name: 'Chicken Kebab',
        itemNo: 1,
        price: '$ 9.88',
      },
    ],
  },
  {
    id: '232',
    name: 'Pureto Vallarta',
    name1: 'Restaurant',
    address: '1901 Ventura Blxd Oxnard',
    img: catRes2,
    fooditems: [
      {
        id: '66',
        name: 'Chicken Lollipop',
        itemNo: 2,
        price: '$ 9.88',
      },
      {
        id: '77',
        name: 'Chicken Kebab',
        itemNo: 1,
        price: '$ 9.88',
      },
    ],
  },
];

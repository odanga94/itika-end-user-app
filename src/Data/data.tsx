const img1 = require('../../assets/clothing-package.png');
const img2 = require('../../assets/food-package.png');
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
    name: 'Clothing Package',
    address: 'Sarit Centre, Karuna Road...',
    rating: 4.9,
    img: img1,
    ratingNo: '(149 ratings)',
  },
  {
    id: '2',
    name: 'Food Package',
    address: 'Java House Mbagathi Way...',
    img: img2,
    rating: 4.9,
    ratingNo: '(129 ratings)',
  },
  {
    id: '3',
    name: 'Food Package',
    address: 'Java House Mbagathi Way...',
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
    name: 'Clothing Package',
    name1: 'Mall',
    address: 'Sarit Centre, Karuna Road...',
    rating: 4.9,
    img: catRes1,
    ratingNo: '(149 ratings)',
  },
  {
    id: '2',
    name: 'Food Package',
    name1: 'Restaurant',
    address: 'Java House Mbagathi Way...',
    img: catRes2,
    rating: 4.9,
    ratingNo: '(129 ratings)',
  },
  {
    id: '3',
    name: 'Clothing Package',
    name1: 'Mall',
    address: 'Sarit Centre, Karuna Road...',
    rating: 4.9,
    img: catRes3,
    ratingNo: '(149 ratings)',
  },
  {
    id: '4',
    name: 'Food Package',
    name1: 'Restaurant',
    address: 'Java House Mbagathi Way...',
    img: catRes4,
    rating: 4.9,
    ratingNo: '(129 ratings)',
  },
];

export const pastOrders = [
  {
    id: '123',
    name1: 'Mall',
    name: 'Clothing Package',
    img: img1,
    address: 'Mountain View',
    fooditems: [
      {
        id: '11',
        name: 'Pair of Jeans',
        itemNo: 2,
        price: 'KES. 500',
      },
      {
        id: '22',
        name: 'T-shirt',
        itemNo: 1,
        price: 'KES. 500',
      },
    ],
  },
  {
    id: '232',
    name: 'Food Package',
    name1: 'Restaurant',
    address: 'Java House Mbagathi',
    img: img2,
    fooditems: [
      {
        id: '66',
        name: 'Chicken Lollipop',
        itemNo: 2,
        price: 'KES. 200',
      },
      {
        id: '77',
        name: 'Chicken Kebab',
        itemNo: 1,
        price: 'KES. 300',
      },
    ],
  },
];

import React from 'react'  
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'  //these are the icons imported for the services section on the homepage

//below links belongs to 3 links in the menu of the website
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
]

//below services belongs to home page, the services section 
export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
]

//this is the API for all the products-array of objects
export const products_url = 'https://course-api.com/react-store-products'

//this is the API for each product-if you try the link below it will say: page not found since we don't add the id of the single product yet
export const single_product_url = `https://course-api.com/react-store-single-product?id=`

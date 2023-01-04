
// import { icons, images } from "./constants";
// import { CategoryData, CurrentLocation, Restaurant } from "./types";
// import { useState, useEffect, useRef } from 'react';
// import * as Location from 'expo-location';
// import * as SQLite from 'expo-sqlite';

// const retrieveData = () => {
//     const db = SQLite.openDatabase('db.visitRecord');
//     console.log('retrieveData() called');
//     const all = [];
//     db.transaction(tx => {
//         tx.executeSql('SELECT * FROM visit_record ',
//             [],
//             (txObj, resultSet) => {
//                 for (let i = resultSet.rows.length - 1; i >= 0; i--) {
//                     let row = resultSet.rows.item(i);
//                     //console.log('data got: ', row.userID, row.cat, row.visitdate, row.visitStarttime, row.visitEndtime, row.restName, row.dishJSON, row.RestPhoto, row.longitude, row.latitude);
//                     let lon = row.longitude;
//                     let lat = row.latitude
//                     let arr = JSON.parse(row.dishJSON)
//                     all.push({id: row.id,
//                          name: row.restName, 
//                          rating:4.8,
//                           categories: JSON.parse(row.cat),
//                           priceRating:1, 
//                           photo:row.RestPhoto,
//                            location:{lat,lon } , 
//                            courier:{avatar: 12, name: 'Amy'},
//                            menu:arr
//                     });
//                 }
//                 // console.log(totalAmount)
//             },
//             (txObj, error) => {
//                 console.log('Error:', error);
//             }
//         )
//     });
// }

// export const restaurantData: Restaurant[] = [];

// export const categoryData: CategoryData[] = [
//     {
//       id: 1,
//       name: 'Rice',
//       icon: icons.rice_bowl,
//     },
//     {
//       id: 2,
//       name: 'Noodles',
//       icon: icons.noodle,
//     },
//     {
//       id: 3,
//       name: 'Hot Dogs',
//       icon: icons.hotdog,
//     },
//     {
//       id: 4,
//       name: 'Salads',
//       icon: icons.salad,
//     },
//     {
//       id: 5,
//       name: 'Burgers',
//       icon: icons.hamburger,
//     },
//     {
//       id: 6,
//       name: 'Pizza',
//       icon: icons.pizza,
//     },
//     {
//       id: 7,
//       name: 'Snacks',
//       icon: icons.fries,
//     },
//     {
//       id: 8,
//       name: 'Sushi',
//       icon: icons.sushi,
//     },
//     {
//       id: 9,
//       name: 'Desserts',
//       icon: icons.donut,
//     },
//     {
//       id: 10,
//       name: 'Drinks',
//       icon: icons.drink,
//     },
//     {
//       id: 11,
//       name: 'test',
//       icon: icons.drink,
//     },
//   ];
  
//   // price rating
//   export const affordable = 1;
//   export const fairPrice = 2;
//   export const expensive = 3;



// export const categoriesMap: {[key: number]: string} = categoryData.reduce(
//     (categoryMap, category: CategoryData) =>
//       (categoryMap = {
//         ...categoryMap,
//         [category.id]: category.name,
//       }),
//     {},
//   );
  
//   export const restaurantsWithCategories: Restaurant[] = restaurantData.map((restaurant) => ({
//     ...restaurant,
//     categoryNames: restaurant.categories.map(
//       (category: number) => categoriesMap[category],
//     ),
//   }));
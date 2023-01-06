CREATE TABLE  visit_record (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userID TEXT ,
        cat TEXT, 
        visitdate TEXT,
        visitStarttime TEXT, 
        visitEndtime TEXT,
        title TEXT, 
        restName TEXT,
        remark TEXT,
        dishJSON TEXT,
        RestPhoto TEXT,
        longitude NUMERIC,
        latitude NUMERIC,
        rating NUMERIC,
        amount NUMERIC
)

CREATE TABLE  user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userUUID TEXT,
        email TEXT,
        username TEXT,
        password TEXT
)


  [{
    id: 1,
    name: 'Hongkong Jorden Burger',
    rating: 4.8,
    categories: [5, 7],
    priceRating: affordable,
    photo: images.burger_visitation_1,
    duration: '11/12/2022',
    start:'',
    end:'',
    remark:'',
    location: {
      latitude: 22.3069785, 
      longitude: 114.1621922,
    },
    menu: [
      {
        menuId: 1,
        name: 'Crispy Chicken Burger',
        photo: images.crispy_chicken_burger,
        description: 'Burger with crispy chicken, cheese and lettuce',
        calories: 200,
        price: 10,
      },
      {
        menuId: 2,
        name: 'Crispy Chicken Burger with Honey Mustard',
        photo: images.honey_mustard_chicken_burger,
        description: 'Crispy Chicken Burger with Honey Mustard Coleslaw',
        calories: 250,
        price: 15,
      },
      {
        menuId: 3,
        name: 'Crispy Baked French Fries',
        photo: images.baked_fries,
        description: 'Crispy Baked French Fries',
        calories: 194,
        price: 8,
      },
    ],
  },
  {
    id: 2,
    name: 'Pizza',
    rating: 4.8,
    categories: [2, 4, 6],
    priceRating: expensive,
    photo: images.pizza_visitation,
    duration: '11/12/2022',
    location: {
      latitude: 22.3069785, 
      longitude: 114.1621922,
    },
    menu: [
      {
        menuId: 4,
        name: 'Hawaiian Pizza',
        photo: images.hawaiian_pizza,
        description: 'Canadian bacon, homemade pizza crust, pizza sauce',
        calories: 250,
        price: 15,
      },
      {
        menuId: 5,
        name: 'Tomato & Basil Pizza',
        photo: images.pizza,
        description:
          'Fresh tomatoes, aromatic basil pesto and melted bocconcini',
        calories: 250,
        price: 20,
      },
      {
        menuId: 6,
        name: 'Tomato Pasta',
        photo: images.tomato_pasta,
        description: 'Pasta with fresh tomatoes',
        calories: 100,
        price: 10,
      },
      {
        menuId: 7,
        name: 'Mediterranean Chopped Salad ',
        photo: images.salad,
        description: 'Finely chopped lettuce, tomatoes, cucumbers',
        calories: 100,
        price: 10,
      },
    ],
  }]
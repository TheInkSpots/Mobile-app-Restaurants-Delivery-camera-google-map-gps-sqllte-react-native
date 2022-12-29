import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

export default function Dashboard({ navigation,routes }) {
  console.log('dashbord is good)');
  // let {params} = routes.params;
  // let name = params.name;
  // let uuid = params.uuid;
  let email = stats.params.email;
  return (
    <Background>
      <Logo />
      <Header>Congrauation! {routes.params.name}, you are registered. \n Your email is {routes.params.email}</Header>
      <Paragraph>
        Let's get started!
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Start using
      </Button>
    </Background>
  )
}

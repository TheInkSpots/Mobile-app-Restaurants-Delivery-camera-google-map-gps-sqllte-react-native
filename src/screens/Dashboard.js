import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

export default function Dashboard({ navigation,route }) {
  //console.log('dashbord is good)');
  const {name, uuid, email} = route.params;

  const name1= route.params.name; 
  const uuid1 = route.params.uuid;
  const email1 = route.params.email;

  console.log('dashbord data  is good --> ', name, uuid, email);
  return (
    <Background>
      <Logo />
      <Header>Congrauation!</Header>
      <Paragraph>You are registered.</Paragraph>
      <Paragraph>{JSON.stringify(name)}</Paragraph>
      <Paragraph> Your email is {JSON.stringify(email)}</Paragraph>
      <Paragraph>
        Let's get started!
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('Home', {email: email,name : name, uuid : uuid})
        }
      >
        Start using
      </Button>
    </Background>
  )
}

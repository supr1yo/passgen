import { useState } from 'react';
import './App.css'
import {
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Box
} from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons'
import Header from './components/header';
import Footer from './components/footer';


export default function App() {
  let [password, setPassword] = useState('');
  let [val, setVal] = useState(8);

  const generatePass = () => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?/{}[]";
    password = '';
    for (let i = 0; i < val; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
      setPassword(password);
    }
  }



  return (
    <div className='main'>
      
    <Header />
        
      <Text style={{ padding: '1rem'}} color='blue.600' fontSize='2xl'>
      {password ? password : "Password here"}
      </Text>
     <br />
      <Slider aria-label='slider-ex-2' defaultValue={8} width='200px' max={20} onChangeEnd={(val) => setVal(val)}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb  boxSize={6}>
          <Box color='blue.500'>
          {val}
          </Box>
        </SliderThumb>
      </Slider>
    <br />
        <Button rightIcon={<RepeatIcon />} colorScheme='blue' onClick={generatePass}>Generate
  </Button>
  <Footer/>
    </div>
    
  )
}

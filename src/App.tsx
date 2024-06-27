import { useState, useCallback, useEffect } from 'react';
import { useToast, Checkbox, Stack } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

const App = () => {
  // React hooks
  const [length, setLength] = useState('8');
  const [number, allowNumber] = useState(false);
  const [symbol, allowSymbol] = useState(false);
  const [password, setPassword] = useState('');

  // Chakra UI hook for toast
  const toast = useToast();
  
  // Generates password
  const generatePassword = useCallback(() => {
    let characters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(number) {
      characters += '0123456789';
    }
    if(symbol) {
      characters += '!.,@#$%^&*()_-+=<>?/{}[]';
    }

    let pass: string = '';

    for (let i = 0; i < Number(length); i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      pass += characters[randomIndex];
      setPassword(pass);
    }
  }, [length, number, symbol]);

  // Function to copy the password
  const copyPassword = () => {
    window.navigator.clipboard.writeText(password)
  }


  useEffect(() => {
    generatePassword();
  }, [generatePassword])



  return (
    // Container
    <div className='w-auto max-w-md mx-auto h-max px-4 py-6 my-80 shadow-md bg-white rounded-md'>
      {/* Heading */}
      <h1 className='text-center text-6xl p-6'>PassGen</h1>

      <div className='flex  overflow-hidden mb-6 rounded-lg'>
        <input type="text"
          className='outline-double bg-greenie w-full py-1 px-1'
          value={password}
          placeholder='Password'
          readOnly
        />

        <button
          className='outline-none bg-customBlue px-3 py-0.5 shrink-0'
          onClick={() => {
            toast({
              title: 'Copied!',
              status: 'success',
              colorScheme: 'blue',
              duration: 1500
            })
            copyPassword();
          }}
        >
          <CopyIcon 
          color={'white'} 
          className='text-white' 
          />
        </button>
      </div>

      {/* Checkmarks and Slider */}
      <div className='flex text-sm gap-x-2'>
        <div>
          <Stack spacing={4} direction={'row'}>
            <Checkbox size='sm' colorScheme='blue' onChange={(e) => allowNumber(e.target.checked)}>
              Number
            </Checkbox>
            <Checkbox size='sm' colorScheme='blue' onChange={(e) => allowSymbol(e.target.checked)}>
              Symbol
            </Checkbox>
          </Stack>
        </div>

        <div className='flex px-5'>
          <input type="range"
            min={6}
            max={20}
            value={length}
            onChange={(event) => {
              setLength(event.target.value)
            }}
          />
          <div className='px-2'>
            Length: {length}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

import * as React from 'react';
import { useState, useEffect } from 'react';
import store from 'store';
import {
  Input,
  Container,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Progress,
} from '@chakra-ui/react';

const Home = () => {
  const [libraries, setLibraries] = useState([]);
  const [tempLibrary, setTempLibrary] = useState('');

  useEffect(() => {
    const currentLibraries = store.get('libraries') || [];
    setLibraries(currentLibraries);
  }, []);

  const addNewLibraryHandler = () => {
    const newLibrary = {
      name: tempLibrary,
      done: 0,
      videos: [],
    };
    const currentLibarires = libraries;
    currentLibarires.unshift(newLibrary);
    store.set('libraries', currentLibarires);
    setLibraries(currentLibarires);
    window.location.reload();
  };

  return (
    <>
      <Container marginTop="5" marginBottom="5">
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Create Library"
            value={tempLibrary}
            onChange={(e) => {
              setTempLibrary(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem" marginRight="1.5">
            <Button h="1.75rem" size="sm" onClick={addNewLibraryHandler}>
              CREATE
            </Button>
          </InputRightElement>
        </InputGroup>
      </Container>
      <Container>
        {libraries.map((library) => {
          return (
            <Box
              key={library.name}
              shadow="md"
              borderWidth="1px"
              marginTop="3"
              height="85"
              borderRadius="md"
            >
              <h1
                style={{
                  textAlign: 'center',
                  marginTop: '10px',
                  fontWeight: 600,
                }}
              >
                {library.name}
              </h1>
              <Progress
                value={library.done}
                margin="20px"
                borderRadius="10px"
                colorScheme="teal"
              />
            </Box>
          );
        })}
      </Container>
    </>
  );
};

export default Home;

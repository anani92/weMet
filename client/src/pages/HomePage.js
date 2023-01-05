import React, { useEffect } from 'react'
import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import Login from '../components/Login'
import Register from '../components/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

const Homepage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      navigate('/dash')
    }
  }, [navigate])

  return (
    <ChakraProvider>
      <Grid
        className="home_container"
        templateRows="1fr"
        templateColumns="repeat(6, 1fr)"
        h="100vh"
        w="100vw"
      >
        <GridItem colSpan={4} className="home_img"></GridItem>
        <GridItem colSpan={2} bg="#fff" minW={'500px'}>
          <Container maxW="xl" centerContent>
            <Box
              d="flex"
              justifyContent="center"
              alignContent="center"
              p="3"
              bg="#fff"
              mt="2em"
            >
              <Text fontSize="4xl">WeMet</Text>
            </Box>
            <Box w="100%" p="4" mt="20px">
              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  <Tab>Login</Tab>
                  <Tab>Sign Up</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Login />
                  </TabPanel>
                  <TabPanel>
                    <Register />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Container>
        </GridItem>
        <ToastContainer theme="colored" />
      </Grid>
    </ChakraProvider>
  )
}

export default Homepage

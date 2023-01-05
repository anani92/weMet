import { FcGoogle } from 'react-icons/fc'
import { Button, Center, Text } from '@chakra-ui/react'

export default function GoogleButton() {
  return (
    <Center p={1}>
      <Button
        w={'full'}
        maxW={'md'}
        variant="outline"
        color="#000"
        width="100%"
        style={{ marginTop: '10px' }}
        leftIcon={<FcGoogle />}
      >
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  )
}

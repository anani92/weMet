import { FcGoogle } from 'react-icons/fc'
import { Button, Center, Text } from '@chakra-ui/react'

export default function GithubButton() {
  return (
    <Center p={1}>
      <Button
        w={'full'}
        variant={'outline'}
        color="#000"
        width="100%"
        leftIcon={<i class="fa fa-github"></i>}
      >
        <Center>
          <Text>Sign in with Github</Text>
        </Center>
      </Button>
    </Center>
  )
}

import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  Divider,
  Image,
  Text,
} from '@chakra-ui/react'
import { IoEyeSharp } from 'react-icons/io5'

import { IconButton } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { ChatState } from '../context/ChatProvider'
const ProfileModel = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = ChatState()
  console.log(user)
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: 'flex' }}
          icon={<IoEyeSharp />}
          onClick={onOpen}
        />
      )}
      <Modal onClose={onClose} size="md" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="1.25rem"
            d="flex"
            justifyContent="center"
            textTransform="capitalize"
          >
            {user.hasOwnProperty('displayName')
              ? user.displayName
              : user.username}
          </ModalHeader>
          <Divider />
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
            bg="whiteAlpha.500"
            p="20px 0"
          >
            <Image
              boxSize="150px"
              src={user.image}
              // alt={!user.user.username ? user.displayName : ''}
            />
            <Text mt="2rem" fontSize={{ base: '1rem', md: '1.25rem' }}>
              Email: {user.hasOwnProperty('email') && user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModel

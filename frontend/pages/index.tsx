import {
    Box,
    Flex,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack,
    Skeleton,
} from '@chakra-ui/react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import Head from 'next/head'
import { useState } from 'react'
import { EventCard } from '../components/EventCard'
import { SearchInputs } from '../components/SearchInputs'
import { Event } from '../globals/types'
import bgImg from '../public/background.jpg'
import styles from '../styles/Home.module.css'

export default function Home() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [eventList, seteventList] = useState<Event[]>([])
    const [selectedCity, setSelectedCity] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('')
    const { isOpen, onClose, onOpen } = useDisclosure()

    const loadEvents = async () => {
        console.log('sending request', selectedCity, selectedGenre)
        setIsLoaded(false)
        try {
            const events = await axios.get(
                `http://localhost:5050/api/events?city=${selectedCity}&genres=${selectedGenre}`
            )

            setIsLoaded(true)
            seteventList(events.data)
        } catch (error) {
            onOpen()
        }
    }

    const onChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value)
    }
    const onChangeGenre = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(event.target.value)
    }

    return (
        <>
            <Head>
                <title>Event information</title>
                <meta
                    name='description'
                    content='App for getting information about live events through livenation.se'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Modal
                motionPreset='slideInBottom'
                isCentered
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(320deg)'
                />
                <ModalContent>
                    <ModalHeader>No events found</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        No events could be found with that information, try
                        another
                    </ModalBody>
                </ModalContent>
                search!
            </Modal>
            <Box
                bgImg={bgImg.src}
                h={'100vh'}
                bgPos={'center'}
                bgSize={'cover'}
                w={'100vw'}
            >
                <Box className={styles.cover}>
                    <main className={styles.main}>
                        <Flex
                            direction={'row'}
                            justifyContent={'space-evenly'}
                            width={'100%'}
                        >
                            <VStack
                                alignItems={'flex-start'}
                                maxH={'100%'}
                                spacing={2}
                            >
                                <Heading
                                    color={'white'}
                                    fontSize={['6xl', '8xl']}
                                >
                                    Events
                                </Heading>
                                <Text color={'white'} fontSize={'2xl'}>
                                    Find and get notified of concerts and live
                                    events near you!
                                </Text>
                                <SearchInputs
                                    selectedCity={selectedCity}
                                    selectedGenre={selectedGenre}
                                    onChangeCity={onChangeCity}
                                    onChangeGenre={onChangeGenre}
                                    onClick={loadEvents}
                                />
                            </VStack>
                            <VStack
                                spacing={1}
                                maxH={'90vh'}
                                overflowY={'scroll'}
                            >
                                {eventList.map((event) => (
                                    <Skeleton isLoaded={isLoaded}>
                                        <EventCard key={nanoid()} {...event} />
                                    </Skeleton>
                                ))}
                            </VStack>
                        </Flex>
                    </main>
                </Box>
            </Box>
        </>
    )
}

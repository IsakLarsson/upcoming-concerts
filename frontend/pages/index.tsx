import { EventCard } from '../components/EventCard'
import { SearchInputs } from '../components/SearchInputs'
import { Event } from '../globals/types'
import {
    Box,
    Heading,
    SimpleGrid,
    Flex,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import Head from 'next/head'
import { useState } from 'react'
import bgImg from '../public/background.jpg'
import styles from '../styles/Home.module.css'

export default function Home() {
    const [eventList, seteventList] = useState<Event[]>([])

    const loadEvents = async () => {
        console.log('sending request')
        const events = await axios.get('http://localhost:5050/api/events')
        seteventList(events.data)
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
                                <SearchInputs onClick={loadEvents} />
                            </VStack>
                            <VStack
                                spacing={1}
                                maxH={'90vh'}
                                overflowY={'scroll'}
                            >
                                {eventList.map((event) => (
                                    <EventCard {...event} />
                                ))}
                            </VStack>
                        </Flex>
                    </main>
                </Box>
            </Box>
        </>
    )
}

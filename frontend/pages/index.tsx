import {
    Box,
    Button,
    Heading,
    HStack,
    Text,
    VStack,
    Input,
} from '@chakra-ui/react'
import axios from 'axios'
import { nanoid } from 'nanoid'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import bgImg from '../public/background.jpg'

type Event = {
    year: string
    month: string
    day: string
    weekday: string
    eventname: string
    city: string
    headliners: string
    venue: string
}

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
                        <VStack alignItems={'flex-start'} spacing={2}>
                            <Heading color={'white'} fontSize={['6xl', '8xl']}>
                                Events
                            </Heading>
                            <Text color={'white'} fontSize={'2xl'}>
                                Find and get notified of concerts and live
                                events near you!
                            </Text>
                            <HStack spacing={2}>
                                <Input
                                    placeholder={'City'}
                                    variant={'filled'}
                                    background={'gray.100'}
                                />

                                <Button
                                    onClick={loadEvents}
                                    colorScheme={'blue'}
                                >
                                    Load events
                                </Button>
                            </HStack>
                            {eventList.map((event) => (
                                <Box key={nanoid()} w={'300px'}>
                                    <Text fontSize={'xl'}>
                                        {event.eventname}
                                    </Text>
                                    <Text fontSize={'md'}>
                                        {event.headliners}
                                    </Text>
                                </Box>
                            ))}
                        </VStack>
                    </main>
                </Box>
            </Box>
        </>
    )
}

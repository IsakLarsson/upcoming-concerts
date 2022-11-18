import Head from 'next/head'
import bgImage from '../public/background.jpg'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import { Button, Box, Text, Image } from '@chakra-ui/react'

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

            <main className={styles.main}>
                <Button onClick={loadEvents} colorScheme={'blue'}>
                    Load eventsss
                </Button>
                {eventList.map((event) => (
                    <Box key={nanoid()} w={'300px'}>
                        <Text fontSize={'xl'}>{event.eventname}</Text>
                        <Text fontSize={'md'}>{event.headliners}</Text>
                    </Box>
                ))}
            </main>
        </>
    )
}

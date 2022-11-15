import Head from 'next/head'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import { Button, Box, Text } from '@chakra-ui/react'
import { NextPage } from 'next'

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
        const events = await axios.get('http://localhost:5050')
        seteventList(events.data)
    }
    return (
        <div className={styles.container}>
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
                    Load events
                </Button>
                {eventList.map((event) => (
                    <Box key={nanoid()} w={'300px'}>
                        <Text fontSize={'xl'}>{event.eventname}</Text>
                        <Text fontSize={'md'}>{event.headliners}</Text>
                    </Box>
                ))}
            </main>
        </div>
    )
}

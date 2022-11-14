import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { Button, Box } from '@chakra-ui/react'

type Event = {
    year?: string
    month?: string
    day?: string
    weekday?: string
    eventname?: string
    city?: string
    headliners?: string
    venue?: string
}
export default function Home() {
    const [eventList, setEventList] = useState<Event[]>([])

    const getEvents = async () => {
        console.log('sending request')
        const fetchedEvents: Event[] = await axios.get('http://localhost:5050')
        setEventList(fetchedEvents.data)
    }
    useEffect(() => {
        console.log(eventList)
    }, [eventList])

    return (
        <div className={styles.container}>
            <Head>
                <title>Event Getter</title>
                <meta
                    name='description'
                    content='An app to gather information on live events'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main className={styles.main}>
                <h1>Current Events</h1>
                <Button colorScheme={'blue'} onClick={getEvents}>
                    load eventss
                </Button>
                {eventList &&
                    eventList.map((item: Event) => (
                        <Box
                            width={'500px'}
                            color='white'
                            bg={'grey'}
                            marginY='4px'
                        >
                            <h1>{item.eventname}</h1>
                            <h3>{item.headliners}</h3>
                        </Box>
                    ))}
            </main>
        </div>
    )
}

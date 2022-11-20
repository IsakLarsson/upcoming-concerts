import React from 'react'

import { Box, Text } from '@chakra-ui/react'

import { nanoid } from 'nanoid'
import { Event } from '../globals/types'

export const EventCard: React.FC<Event> = (event: Event) => {
    return (
        <Box key={nanoid()} w={'300px'}>
            <Text fontSize={'xl'}>{event.eventname}</Text>
            <Text fontSize={'md'}>{event.headliners}</Text>
        </Box>
    )
}

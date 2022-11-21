import React from 'react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

import { Box, Grid, GridItem, Text, Center, HStack } from '@chakra-ui/react'

import { nanoid } from 'nanoid'
import { Event } from '../globals/types'

export const EventCard: React.FC<Event> = (event) => {
    return (
        <Box
            borderRadius={'5px'}
            key={nanoid()}
            bg={'rgba(61,61,61,0.8)'}
            w={'400px'}
            maxWidth={'100%'}
        >
            <Grid templateColumns={'repeat(6, 1fr)'}>
                <GridItem padding={'1rem'} colSpan={5} color={'white'}>
                    <Text fontSize={'2xl'}>{event.eventname}</Text>
                    <HStack>
                        <Text fontSize={'l'}>{event.weekday}</Text>
                        <Text fontSize={'l'}>{event.day}</Text>
                        <Text fontSize={'l'}>{event.month}</Text>
                        <Text fontSize={'l'}>{event.year}</Text>
                    </HStack>
                    <HStack>
                        <Text fontSize={'md'}>{event.headliners}, </Text>
                        <Text fontSize={'md'}>{event.venue},</Text>
                        <Text fontSize={'md'}>{event.city}</Text>
                    </HStack>
                </GridItem>
                <GridItem
                    borderRadius={'0 5px 5px 0'}
                    bg={'green.400'}
                    colSpan={1}
                >
                    <a href={event.href}>
                        <Center h={'100%'}>
                            <ArrowForwardIcon color={'white'} />
                        </Center>
                    </a>
                </GridItem>
            </Grid>
        </Box>
    )
}

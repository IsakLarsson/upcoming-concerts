import { ChangeEventHandler, useEffect, useState } from 'react'
import { citiesList, genreList } from '../globals/searchTerms'
import { SearchIcon } from '@chakra-ui/icons'
import { Select, Button, HStack } from '@chakra-ui/react'
import { MouseEventHandler } from 'react'
import { nanoid } from 'nanoid'

interface Props {
    selectedCity: string
    selectedGenre: string
    onClick: MouseEventHandler
    onChangeGenre: ChangeEventHandler
    onChangeCity: ChangeEventHandler
}
export const SearchInputs: React.FC<Props> = ({
    selectedCity,
    selectedGenre,
    onChangeCity,
    onChangeGenre,
    onClick,
}) => {
    return (
        <>
            <HStack spacing={2}>
                <Select
                    placeholder='All cities'
                    value={selectedCity}
                    onChange={onChangeCity}
                    color={'white'}
                >
                    {citiesList.map((city: string) => (
                        <option key={nanoid()} value={city}>
                            {city}
                        </option>
                    ))}
                </Select>
                <Select
                    placeholder='All genres'
                    onChange={onChangeGenre}
                    value={selectedGenre}
                    color={'white'}
                >
                    {genreList.map((genre: string) => (
                        <option key={nanoid()} value={genre}>
                            {genre}
                        </option>
                    ))}
                </Select>

                <Button
                    minW={'100px'}
                    onClick={onClick}
                    colorScheme={'green'}
                    rightIcon={<SearchIcon />}
                >
                    Search
                </Button>
            </HStack>
        </>
    )
}

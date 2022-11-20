import { citiesList, genreList } from '../globals/searchTerms'
import { SearchIcon } from '@chakra-ui/icons'
import { Select, Button, HStack } from '@chakra-ui/react'
import { MouseEventHandler } from 'react'

interface Props {
    onClick: MouseEventHandler
}
export const SearchInputs: React.FC<Props> = ({ onClick }) => {
    return (
        <>
            <HStack spacing={2}>
                <Select placeholder='All cities' color={'white'}>
                    {citiesList.map((city: string) => (
                        <option>{city}</option>
                    ))}
                </Select>
                <Select placeholder='All genres' color={'white'}>
                    {genreList.map((genre: string) => (
                        <option>{genre}</option>
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

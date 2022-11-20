import { extendTheme } from '@chakra-ui/react'
import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
    // define the part you're going to style
    field: {
        fontFamily: 'mono', // change the font family
        background: 'gray.400',
    },
})

const inputTheme = defineMultiStyleConfig({ baseStyle })

const theme = extendTheme({
    fonts: {
        heading: `'Monoton', sans-serif`,
        body: `'Iceberg', sans-serif`,
    },
    components: {
        Input: inputTheme,
    },
})
export default theme

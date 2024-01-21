import {
    Text,
    Highlight
} from '@chakra-ui/react'

export default function Header() {
    return (
        <>
            <Text fontSize='6xl'>PassGen</Text>
            <Highlight query='simple' fontSize='sm' styles={{ px: '0.5', py: '0.5', rounded: 'full', bg: 'orange.100' }}>
                A simple password generator
            </Highlight>
        </>
    )
}
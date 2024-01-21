import { Link, Container, Text } from '@chakra-ui/react'


export default function Footer() {
    return(
        <Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
          <Text fontSize="sm" color="fg.subtle">
            Made by <Link href={"https://github.com/supr1yo"} target='_blank'>Supriyo</Link>
          </Text>
      
      </Container>
    )
}
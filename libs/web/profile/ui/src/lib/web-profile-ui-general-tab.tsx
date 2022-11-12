import { Box } from '@chakra-ui/react'
import { User } from '@kin-kinetic/web/util/sdk'

export function WebProfileUiGeneralTab({ user }: { user: User }) {
  return (
    <Box as="pre" p="2" overflow="hidden" fontSize="2xs">
      {JSON.stringify(user, null, 2)}
    </Box>
  )
}

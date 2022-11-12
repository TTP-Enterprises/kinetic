import { Box } from '@chakra-ui/react'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { UserIdentity } from '@kin-kinetic/web/util/sdk'
import { List } from '@saas-ui/react'

export function WebProfileUiIdentitiesTab({ identities }: { identities: UserIdentity[] }) {
  if (!identities.length) {
    return (
      <Box p={4}>
        <WebUiAlert message={'You have no linked identities.'} />
      </Box>
    )
  }
  return <List items={identities?.map((identity) => ({ primary: identity.type }))} />
}

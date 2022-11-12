import { Box, useToast } from '@chakra-ui/react'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiFormModal } from '@kin-kinetic/web/ui/form'
import { AdminMintCreateInput, UserEmail, useUserAddEmailMutation } from '@kin-kinetic/web/util/sdk'
import { FieldValues, List } from '@saas-ui/react'
import * as Yup from 'yup'

export function WebProfileUiEmailsTab({ emails }: { emails: UserEmail[] }) {
  const [, addEmailMutation] = useUserAddEmailMutation()
  const toast = useToast()
  const schema = Yup.object().shape({
    email: Yup.string().required().label('Email address'),
  })

  const addEmail = ({ email }: { email: string }) => {
    addEmailMutation({ email })
      .then(() => {
        toast({ status: 'success', title: 'Your email has been added.' })
      })
      .catch(() => {
        toast({ status: 'error', title: 'Something went wrong' })
      })
  }

  if (!emails?.length) {
    return (
      <Box p={4}>
        <WebUiAlert message={'You have no linked emails.'} />
      </Box>
    )
  }

  return (
    <Box>
      <Box p={4}>
        <WebUiFormModal<AdminMintCreateInput>
          data={{}}
          onSubmit={(data: FieldValues) => addEmail(data as { email: string })}
          submitLabel="Add Email"
          schema={schema}
        />
      </Box>
      <List items={emails.map((email) => ({ primary: email.email }))} />
    </Box>
  )
}

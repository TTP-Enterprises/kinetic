import { Box, Flex, Stack } from '@chakra-ui/react'
import {
  AdminAppUiTransactionErrors,
  AdminAppUiTransactionDetail,
  AdminAppUiTransactionStatus,
  AdminAppUiTransactionTimeline,
} from '@mogami/admin/app/ui'
import { AdminUiLoader } from '@mogami/admin/ui/loader'
import { useAppTransactionQuery } from '@mogami/shared/util/admin-sdk'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function AdminAppFeatureTransactionDetail() {
  const { appId, appTransactionId } = useParams<{ appId: string; appTransactionId: string }>()
  const [{ data, fetching }] = useAppTransactionQuery({ variables: { appId, appTransactionId } })

  if (fetching) {
    return <AdminUiLoader />
  }

  return (
    <Stack direction="column" spacing={6}>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex justifyContent="space-between" alignItems="center">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated flex={'auto'}>
            Transaction {data?.item?.id}
          </Box>
          <Box justifyContent={'end'} mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            <AdminAppUiTransactionStatus status={data?.item?.status} />
          </Box>
        </Flex>
      </Box>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        {data?.item && <AdminAppUiTransactionDetail item={data?.item} />}
      </Box>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {data?.item && <AdminAppUiTransactionErrors item={data?.item} />}
      </Box>
      <Box p="6" borderWidth="1px" borderRadius="lg" overflow="hidden">
        {data?.item && <AdminAppUiTransactionTimeline item={data?.item} />}
      </Box>
      <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
        {JSON.stringify(data?.item, null, 2)}
      </Box>
    </Stack>
  )
}
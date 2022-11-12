import { WebAdminUiTabs } from '@kin-kinetic/web/admin/ui'
import { WebProfileUiEmailsTab, WebProfileUiGeneralTab, WebProfileUiIdentitiesTab } from '@kin-kinetic/web/profile/ui'
import { WebUiAlert } from '@kin-kinetic/web/ui/alert'
import { WebUiLinks } from '@kin-kinetic/web/ui/link'
import { WebUiLoaderPage } from '@kin-kinetic/web/ui/loader'
import { WebUiPage } from '@kin-kinetic/web/ui/page'
import { useMeQuery } from '@kin-kinetic/web/util/sdk'
import { Navigate, Route, Routes } from 'react-router-dom'

export function WebProfileFeature() {
  const [{ data, fetching }] = useMeQuery()
  const tabs: WebUiLinks = [
    { label: 'General', path: 'general' },
    { label: 'Emails', path: 'emails' },
    { label: 'Identities', path: 'identities' },
  ]

  if (fetching) {
    return <WebUiLoaderPage />
  }

  if (!data?.me) {
    return <WebUiAlert status="error" message="User profile not found :(" />
  }

  return (
    <WebUiPage title={'My Profile'}>
      <WebAdminUiTabs tabs={tabs}>
        <Routes>
          <Route index element={<Navigate to="general" replace />} />
          <Route path="general" element={<WebProfileUiGeneralTab user={data.me} />} />
          <Route path="emails" element={<WebProfileUiEmailsTab emails={data?.me?.emails ?? []} />} />
          <Route path="identities" element={<WebProfileUiIdentitiesTab identities={data?.me?.identities ?? []} />} />
        </Routes>
      </WebAdminUiTabs>
    </WebUiPage>
  )
}

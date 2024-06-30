import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { DatabaseUpdateProvider } from './context/DatabaseUpdateContext'
import { ThemeProvider } from "@/components/ui/theme-provider"
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <RedwoodApolloProvider>
        <DatabaseUpdateProvider>
          <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <Routes />
          </ThemeProvider>
        </DatabaseUpdateProvider>
      </RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App

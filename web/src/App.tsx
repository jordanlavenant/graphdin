import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { ThemeProvider } from "@/components/ui/theme-provider"
import { GraphRedrawProvider } from './context/GraphRedrawContext'
import { SelectedNodeProvider } from './context/SelectedNodeContext'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <RedwoodApolloProvider>
        <GraphRedrawProvider>
          <SelectedNodeProvider>
            <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
              <Routes />
            </ThemeProvider>
          </SelectedNodeProvider>
        </GraphRedrawProvider>
      </RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App

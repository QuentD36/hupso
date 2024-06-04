import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './routes'
import { FilterProvider } from './context/FilterContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Toaster } from 'sonner'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <RouterProvider router={router} />
        <Toaster />
      </FilterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

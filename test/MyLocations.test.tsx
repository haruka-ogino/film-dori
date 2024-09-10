import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'
import MyLocations from '@/app/my-locations/page'

function renderMyLocations() {
  const queryClient = new QueryClient()

  render(
    <QueryClientProvider client={queryClient}>
      <MyLocations />
    </QueryClientProvider>
  )
}

describe('MyLocations component', () => {
  describe('Render', () => {
    it('', () => {
      // Arrange
      renderMyLocations()
      // Act

      // Assert
    })
  })
})

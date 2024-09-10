import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LocationCard from '@/components/LocationCard'
import '@testing-library/jest-dom'

const mockLocation = {
  address: 'Japan, 〒206-0013 Tokyo, Tama, Sakuragaoka, 4-chōme−４３−２５',
  authId: '123',
  description:
    'A neighborhood that inspired locations in "Whisper of the Heart"',
  id: 'ChIJmbzCFl_jGGAR98V28VrP0QI',
  image:
    'https://d20aeo683mqd6t.cloudfront.net/articles/title_images/000/040/281/original/cover-photo.jpg',
  name: 'Iroha-zaka Slope',
  rating: 4.3,
  tag: 'ghibli',
  tagId: 1,
  url: 'https://maps.google.com/?cid=203171447713482231',
  userImg: 'image-link',
  username: 'koda',
}
const mockTagClick = jest.fn()
const mockNameClick = jest.fn()
const mockAuthId = '123'

function renderCard(mockTitle: string) {
  const queryClient = new QueryClient()

  render(
    <QueryClientProvider client={queryClient}>
      <LocationCard
        location={mockLocation}
        title={mockTitle}
        handleTagClick={mockTagClick}
        handleNameClick={mockNameClick}
        authId={mockAuthId}
      />
    </QueryClientProvider>
  )
}

describe('LocationCard component', () => {
  describe('Render', () => {
    it('address field should render', () => {
      // Arrange
      renderCard('Locations')
      // Act
      const text = screen.getByText('Address:')
      // Assert
      expect(text).toBeInTheDocument()
    })
    it('delete button should render', () => {
      // Arrange
      renderCard('My Locations')
      // Act
      const text = screen.getByTestId('delete-location')
      // Assert
      expect(text).toBeInTheDocument()
    })
  })
})

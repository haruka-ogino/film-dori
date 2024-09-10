import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'
import Locations from '@/components/Locations'
import '@testing-library/jest-dom'
import { Location } from '@/models/locations'

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

const mockSetTag = jest.fn()
const mockAuthId = '123'

function renderLocations(
  mockTitle: string,
  mockLocations: Location[],
  tag: number
) {
  const queryClient = new QueryClient()

  render(
    <QueryClientProvider client={queryClient}>
      <Locations
        locations={mockLocations}
        title={mockTitle}
        setTag={mockSetTag}
        tag={tag}
        authId={mockAuthId}
      />
    </QueryClientProvider>
  )
}

describe('Locations component', () => {
  describe('Render', () => {
    it('render media type tag', () => {
      // Arrange
      renderLocations('Locations', [mockLocation, mockLocation], 1)
      // Act
      const tag = screen.getByRole('button', { name: 'x' })

      // Assert
      expect(tag).toBeInTheDocument()
    })
  })
})

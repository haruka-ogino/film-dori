import { render, screen } from '@testing-library/react'
import About from '@/app/about/page'
import '@testing-library/jest-dom'

describe('About component', () => {
  it('About', async () => {
    // Arrange
    render(<About />)
    // Act
    const currentHeading = screen.getByText('About this website')
    // Assert
    expect(currentHeading).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer'
import '@testing-library/jest-dom'

describe('Footer component', () => {
  it('Footer title', () => {
    // Arrange
    render(<Footer />)
    // Act
    const currentHeading = screen.getByRole('heading', { level: 1 })
    // Assert
    expect(currentHeading).toHaveTextContent('Made by Haruka Ogino')
  })

  it('check for github link', () => {
    // Arrange
    render(<Footer />)
    // Act
    const currentHeading = screen.getByText("Website's GitHub Repo")
    // Assert
    expect(currentHeading).toBeInTheDocument()
  })

  it('check for tech stack', () => {
    // Arrange
    render(<Footer />)
    // Act
    const currentHeading = screen.getByRole('heading', {
      name: 'This website was built using:',
    })
    // Assert
    expect(currentHeading).toBeInTheDocument()
  })
})

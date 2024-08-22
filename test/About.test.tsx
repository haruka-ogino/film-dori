import { render, screen } from '@testing-library/react'
import About from '@/app/about/page'
import '@testing-library/jest-dom'

describe('About component', () => {
  it('About title', async () => {
    // Arrange
    render(<About />)
    // Act
    const currentHeading = screen.getByRole('heading', { level: 1 })
    // Assert
    expect(currentHeading).toHaveTextContent('About this website')
    // expect(currentHeading.textContent).toBe('About this website')
  })

  it('check for future goals heading', async () => {
    // Arrange
    render(<About />)
    // Act
    const currentHeading = screen.getByText('Future goals for this app')
    // Assert
    expect(currentHeading).toBeInTheDocument()
  })

  it('check for film dori meaning', async () => {
    // Arrange
    render(<About />)
    // Act
    const currentHeading = screen.getByRole('heading', {
      name: 'What does Film Dori mean?',
    })
    // Assert
    expect(currentHeading).toBeInTheDocument()
  })
})

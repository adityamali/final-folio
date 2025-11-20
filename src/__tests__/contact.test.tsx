import React from 'react'
import { render, screen } from '@testing-library/react'
import Contact from '@/components/sections/Contact'

describe('Contact component', () => {
  it('renders contact heading and email', () => {
    render(<Contact />)
    expect(screen.getByText(/Get in touch/i)).toBeInTheDocument()
    expect(screen.getByText(/hello@adityamali.com/i)).toBeInTheDocument()
  })
})

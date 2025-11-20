import React from 'react'
import { render, screen } from '@testing-library/react'

function Hello() {
  return <div>Hello world</div>
}

test('renders hello world', () => {
  render(<Hello />)
  expect(screen.getByText(/Hello world/i)).toBeInTheDocument()
})

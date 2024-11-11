// src/components/__tests__/ButtonTab.test.jsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../../features/rootReducer' // Importer le reducer racine
import ButtonTab from '../ButtonTab'
import { hidePreview } from '../../features/preview'

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return render(<Provider store={store}>{component}</Provider>)
}

test('ButtonTab renders correctly and handles click', () => {
  const mockToggleTab = jest.fn()
  const { getByText, getByAltText } = renderWithRedux(
    <ButtonTab
      id="1"
      toggleTab={mockToggleTab}
      buttonContent="Test Button"
      imgURL="/path/to/image"
      isActive={false}
    />
  )

  expect(getByText('Test Button')).toBeInTheDocument()
  expect(getByAltText('Test Button')).toHaveAttribute('src', '/path/to/image')

  fireEvent.click(getByText('Test Button'))
  expect(mockToggleTab).toHaveBeenCalledWith('1')
  // Assure that hidePreview is dispatched
})

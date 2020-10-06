import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent } from '@testing-library/react' //for functions
import { render } from '@testing-library/react' // normal setting
import { prettyDOM } from '@testing-library/dom' // for test part of component
import Note from './Note'

//------test div ------------------------------------------------
test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note}></Note>
  )


  // // console print the html of the document
  // component.debug()
  // const li = component.container.querySelector('li')
  // console.log(prettyDOM(li))


  // method 1
  // expect(component.container).toHaveTextContent(
  //   'Component testing is done with react-testing-library'
  // )

  // // method 2
  // const element = component.getByText(
  //   'Component testing is done with react-testing-library'
  // )
  // expect(element).toBeDefined()

  // // method 3
  // const div = component.container.querySelector('.Note')
  // expect(div).toHaveTextContent(
  //   'Component testing is done with react-testing-library'
  // )
})

//------test button click --------------------------------------------
test('clicking the button calls event handler once', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()

  const component = render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const button = component.getByText('make not important')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

})


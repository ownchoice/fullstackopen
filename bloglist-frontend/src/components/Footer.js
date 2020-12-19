import React from 'react'

const Footer = (props) => {
  return (
    <div>
      <hr />
      Made with{' '}
      <span role='img' aria-label='Heart emoji'>
        ❤️
      </span>{' '}
      by{' '}
      <a
        href='https://www.google.com/search?client=firefox-b-d&q=who+am+i'
        target='_blank'
        rel='noopener noreferrer'
      >
        me
      </a>
    </div>
  )
}

export default Footer

import React from 'react'

const Footer = (props) => {
  return (
    <footer className="pt-4 my-md-5 pt-md-5 border-top">
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
    </footer>
  )
}

export default Footer

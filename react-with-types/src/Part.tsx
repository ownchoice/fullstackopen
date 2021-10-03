import React from 'react'
import { CoursePart, assertNever, CoursePartPropTypes } from './types'
// import PropTypes from 'prop-types'

interface Props {
  part: CoursePart
}

const Part = ({ part }: Props) => {
  const renderPart = (part: CoursePart) => {
    switch (part.type) {
    case 'normal':
      return (
        <p>
          {part.name}: <strong>{part.exerciseCount}</strong>
          <br />
          <em>{part.description}</em>
        </p>
      )
    case 'groupProject':
      return (
        <p>
          {part.name}: <strong>{part.exerciseCount}</strong>
          <br />
            Project exercises: {part.groupProjectCount}
        </p>
      )
    case 'submission':
      return (
        <p>
          {part.name}: <strong>{part.exerciseCount}</strong>
          <br />
          <em>{part.description}</em>
          <br />
            Submit to:{' '}
          <a
            href={part.exerciseSubmissionLink}
            title={`Submission link for "${part.name}"`}
          >
            {part.exerciseSubmissionLink}
          </a>
        </p>
      )
    case 'special':
      return (
        <p>
          {part.name}: <strong>{part.exerciseCount}</strong>
          <br />
          <em>{part.description}</em>
          <br />
            Required skills: <em>{part.requirements.join(', ')}</em>
        </p>
      )
    default:
      return assertNever(part)
    }
  }

  return <div>{renderPart(part)}</div>
}

Part.propTypes = {
  part: CoursePartPropTypes,
}

export default Part

import PropTypes from 'prop-types'

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

export interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

export interface CoursePartDesc extends CoursePartBase {
  description: string
}

export interface CourseNormalPart extends CoursePartDesc {
  type: 'normal'
}
export interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject'
  groupProjectCount: number
}

export interface CourseSubmissionPart extends CoursePartDesc {
  type: 'submission'
  exerciseSubmissionLink: string
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart

export const CoursePartPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  exerciseCount: PropTypes.number.isRequired,
  // type: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['normal', 'groupProject', 'submission']),
  description: PropTypes.string,
  groupProjectCount: PropTypes.number,
  exerciseSubmissionLink: PropTypes.string,
})

// export const CoursePartBasePropTypes = PropTypes.shape({
//   name: PropTypes.string,
//   exerciseCount: PropTypes.number,
//   type: PropTypes.string,
//   // type: PropTypes.oneOf(['normal', 'groupProject', 'submission']),
// })

// export const CoursePartDescPropTypes = PropTypes.shape({
//   ...CoursePartBasePropTypes,
//   description: PropTypes.string,
// })

// export const CourseNormalPartPropTypes = PropTypes.shape({
//   ...CoursePartDescPropTypes,
//   // type: PropTypes.oneOf(['normal']),
// })

// export const CourseProjectPartPropTypes = PropTypes.shape({
//   ...CoursePartBasePropTypes,
//   groupProjectCount: PropTypes.number,
//   // type: PropTypes.oneOf(['groupProject']),
// })

// export const CourseSubmissionPartPropTypes = PropTypes.shape({
//   ...CoursePartDescPropTypes,
//   exerciseSubmissionLink: PropTypes.string,
//   // type: PropTypes.oneOf(['submission']),
// })

// export const CoursePartPropTypes = PropTypes.oneOfType([
//   // CoursePartDescPropTypes,
//   CourseNormalPartPropTypes,
//   CourseProjectPartPropTypes,
//   CourseSubmissionPartPropTypes,
// ])

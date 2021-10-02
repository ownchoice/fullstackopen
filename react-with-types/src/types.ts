import PropTypes from 'prop-types'

export interface CoursePart {
  name: string
  exerciseCount: number
}

export const CoursePartPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    name: PropTypes.string,
    exerciseCount: PropTypes.number,
  })
)

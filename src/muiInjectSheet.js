import React from 'react'
import wrapDisplayName from 'recompose/wrapDisplayName'
import getDisplayName from 'recompose/getDisplayName'
import customPropTypes from 'material-ui/utils/customPropTypes'
import { createStyleSheet } from 'jss-theme-reactor'

const sanitize = displayName => (displayName.replace(/(\(|\[)/g, '-').replace(/(\)|\])/g, '')) // todo make this better

const muiInjectSheet = styles => (WrappedComponent) => {
  return class extends React.Component {
    constructor (props) {
      super(props)
      const name = sanitize(getDisplayName(WrappedComponent))
      if (styles === undefined) {
        this.styleSheet = createStyleSheet(name, () => {})
      } else if (typeof styles === 'function') {
        this.styleSheet = createStyleSheet(name, theme => styles(theme))
      } else {
        this.styleSheet = createStyleSheet(name, () => styles)
      }
    }

    static displayName = wrapDisplayName(WrappedComponent, 'MuiJss')

    static contextTypes = {
      styleManager: customPropTypes.muiRequired
    }

    render () {
      if (this.context.styleManager === undefined) return (<div>You didn't supply the Material-UI Theme Context</div>)
      const classes = this.context.styleManager.render(this.styleSheet)
      return (
        <WrappedComponent classes={classes} {...this.props}/>
      )
    }
  }
}

export default muiInjectSheet

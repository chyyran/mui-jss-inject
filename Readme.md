# `mui-jss-inject`

`injectSheet` JSS higher-order-component for use with `material-ui@next`. 
Removes the dependency on `contextTypes` when using `material-ui@next` components. Note that you must provide your own theming context, see the [example here](https://github.com/callemall/material-ui/blob/next/docs/src/components/App.js).

## Usage

Use just like you would use [`react-jss`](http://cssinjs.org/react-jss?v=v6.1.1). 

```es6
import React from 'react'
import Paper from 'material-ui/Paper'

import injectSheet from 'utils/muiInjectSheet'

const styles = {
  imageContainer: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: '100%',
    borderRadius: 'inherit',
    padding: 10
  },
  image: {
    objectFit: 'cover',
    borderRadius: 'inherit',
    userDrag: 'none',
    userSelect: 'none',
  }
}

const ImageCard = ({classes, image}) => (
  <Paper>
    <div className={classes.imageContainer}>
      <img className={classes.image} src={image}/>
    </div>
  </Paper>
)

export default injectSheet(styles)(ImageCard)

```

## Accessing the `theme`.

Material-UI provides a `theme` object to maintain consistency across the entire application. To access it, wrap your jss styles in a function.

```es6

import injectSheet from 'utils/muiInjectSheet'

const styles = theme => ({
  imageContainer: {
    ... 
    backgroundColor: theme.palette.background[400]
  },
  image: {
    ...
  }
})

const ImageCard = ({classes, image}) => (
  ...
)
export default injectSheet(styles)(ImageCard)
```
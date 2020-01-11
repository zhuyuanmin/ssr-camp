import React from 'react'
import styles from './About.css'
import withStyle from '../withStyle'

function About(props) {
  return (
    <div className={styles.title}>关于页面</div>
  )
}
export default withStyle(About, styles)

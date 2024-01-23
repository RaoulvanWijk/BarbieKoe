import React from 'react'
import { Link } from "react-router-dom";
import home from '../../../resources/images/svg/home.svg'
import mail from '../../../resources/images/svg/mail.svg'
import none from '../../../resources/images/svg/none.svg'

import '/resources/styles/components/layout/side-nav-item.scss'


type sideNavItemProps = {
  icon: string,
  label: string,
  link: string
}

export default function SideNavItem(props: sideNavItemProps) {
  let icon: string = ''

  switch (props.icon) {
    case 'home':
      icon = home
      break
    case 'mail':
      icon = mail
      break
    default:
      icon = none
  }
  return (
    <li className='side-nav-item'>
      <Link to={props.link}>
        <img src={icon} alt="" />
        <span>{props.label}</span>
      </Link>
    </li>
  )
}

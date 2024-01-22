import React from 'react'
import { Link } from "react-router-dom";
import home from '../../../resources/images/svg/home.svg'
import mail from '../../../resources/images/svg/mail.svg'
import none from '../../../resources/images/svg/none.svg'

type sideNavItemProps = {
  icon: string,
  label: string,
  link: string
}

export default function SideNavItem(props: sideNavItemProps) {
  let icon: string = ''

  switch(props.icon) {
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
    <li>
      <img src={icon} alt="" />
      <Link to={props.link}>{props.label}</Link>
    </li>
  )
}

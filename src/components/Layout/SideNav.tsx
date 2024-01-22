import React from 'react'

import SideNavItem from './SideNavItem'

export default function Sidenav() {
  return (
    <div className='side-nav'>
      <svg xmlns="http://www.w3.org/2000/svg" width="126" height="97" viewBox="0 0 126 97" fill="none">
        <path d="M67.8438 86.7812V10H38.125C29.5 10 23.0938 11.8438 18.9062 15.5312C14.7188 19.1562 12.625 24.1875 12.625 30.625C12.625 34.0625 13.4375 37.125 15.0625 39.8125C16.625 42.4375 18.6875 44.5 21.25 46C18.375 47.1875 15.7812 49.3438 13.4688 52.4688C11.1562 55.5312 10 59.3438 10 63.9062C10 70.5938 12.1562 76.0938 16.4688 80.4062C20.7812 84.6562 26.75 86.7812 34.375 86.7812H67.8438ZM52.2812 73.4688H36.625C33.875 73.4688 31.4688 72.6562 29.4062 71.0312C27.2812 69.4062 26.2188 67.0312 26.2188 63.9062C26.2188 61.0312 27.1562 58.6562 29.0312 56.7812C30.8438 54.8438 33.5 53.875 37 53.875H52.2812V73.4688ZM52.2812 40.75H39.3438C36.1562 40.75 33.625 40 31.75 38.5C29.8125 37 28.8438 34.7812 28.8438 31.8438C28.8438 26.2188 32.25 23.4062 39.0625 23.4062H52.2812V40.75Z" fill="#F0EEE2"/>
        <path d="M53.6562 86.7812V10H69.2188V41.125H69.5L96.2188 10H115.719L85.625 43.75L115.906 86.7812H97.3438L75.875 54.7188L69.2188 62.2188V86.7812H53.6562Z" fill="#F0EEE2"/>
      </svg>
      <ul>
        <SideNavItem icon='home' label='Dashboard' link="/dashboard" />
        <SideNavItem icon='none' label='Reserveringen' link="/reservations" />
        <SideNavItem icon='mail' label='Mail' link="/mail" />
        <SideNavItem icon='none' label='Activiteiten' link="/activities" />
        <SideNavItem icon='none' label='Onderhoud' link="/reparations" />
        <SideNavItem icon='none' label='Instellingen' link="/settings" />
      </ul>
    </div>
  )
}

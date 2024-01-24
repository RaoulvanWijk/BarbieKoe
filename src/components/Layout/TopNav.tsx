import '/resources/styles/components/layout/top-nav.scss'
import Profile from './Profile'

export default function TopNav() {
  return (
    <nav className='top-nav'>
      <button className='prim-btn'>Nieuwe reservering</button>

      <Profile />
    </nav>
  )
}

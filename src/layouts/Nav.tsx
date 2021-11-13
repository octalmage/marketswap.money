import { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import c from 'classnames'
import { Proposal } from '@terra-money/terra.js'
import { useMenu } from '../lib'
import Icon from '../components/Icon'
import { ErrorBoundaryComponent } from '../components/ErrorBoundary'
import NavItem from './NavItem'
import Guide from './Guide'
import Lang from './Lang'
import Currency from './Currency'
import Chain from './Chain'
import Height from './Height'
import s from './Nav.module.scss'

const Nav = () => {
  const { pathname } = useLocation()
  /* Menu */
  const name = useMenu()

  /* mobile */
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggle = () => setIsOpen(!isOpen)
  const close = () => setIsOpen(false)

  const menu = [
    {
      name: name['Swap'],
      to: '/',
      icon: 'timeline',
    },
  ]

  /* Close on change path (Android) */
  useEffect(() => {
    close()
  }, [pathname])

  return (
    <nav className={s.nav}>
      <header className={s.header}>
        <Link to="/" className={s.logo}>
          Market<b>Swap</b>
        </Link>

        <button onClick={toggle} className={s.toggle}>
          <Icon name={isOpen ? 'close' : 'menu'} />
        </button>
      </header>

      <section className={c(s.main, isOpen && s.open)}>
        <ul className={s.menu}>
          {menu.map((item) => (
            <li className={s.item} key={item.name}>
              <NavItem {...item} />
            </li>
          ))}
        </ul>

        <footer className={s.footer}>
          <section className={s.chain}>
            <Chain />
            <ErrorBoundaryComponent>
              <Height />
            </ErrorBoundaryComponent>
          </section>
        </footer>
      </section>
    </nav>
  )
}

export default Nav

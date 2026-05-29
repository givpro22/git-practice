import { NavLink } from 'react-router-dom'
import { Home, ShieldCheck, ClipboardList, MessageCircle, Sparkles, MessagesSquare } from 'lucide-react'
import './Navbar.css'

const navItems = [
  { path: '/', icon: Home, label: '홈' },
  { path: '/verify', icon: ShieldCheck, label: '인증' },
  { path: '/survey', icon: ClipboardList, label: '설문' },
  { path: '/chatbot', icon: MessageCircle, label: 'AI 챗봇' },
  { path: '/matching', icon: Sparkles, label: '매칭' },
  { path: '/chat', icon: MessagesSquare, label: '채팅' },
]

export default function Navbar() {
  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="navbar" id="main-navbar">
        <div className="navbar-inner">
          <NavLink to="/" className="navbar-logo" id="navbar-logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text gradient-text">RoomieMatch</span>
          </NavLink>

          <div className="navbar-links" id="navbar-links">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                id={`nav-link-${label}`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="navbar-mobile" id="mobile-navbar">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `nav-mobile-link ${isActive ? 'active' : ''}`}
            id={`mobile-nav-${label}`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}

import React from 'react'
import Login from './Login'
import './MBdNav.css'
import { Link } from 'react-router-dom'

function MBdNav() {
  return (
    <div>
            <nav className="navbar">
               
        <div className="logo">IMDb</div>
                
                
        
        <button className="menu-btn">
            <div className="menu-icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span>Menu</span>
        </button>

        <div className="search-container">
            <select className="category-dropdown">
                <option>All</option>
                <option>Titles</option>
                <option>TV Episodes</option>
                <option>Celebs</option>
                <option>Companies</option>
                <option>Keywords</option>
            </select>
            <input type="text" className="search-input" placeholder="Search IMDb"/>
            <button className="search-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="#666" />
                    <path d="M12.5 12.5L17 17" stroke="#666" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>

        <Link  to='/pro' className="nav-right">
            <div className="pro-badge">
                <span>IMDb</span><span className="pro-text">Pro</span>
            </div>
            </Link>

            <Link to="/watchlist" className="nav-link">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L3 8V18H7V13H13V18H17V8L10 2Z" fill="white"/>
                </svg>
                Watchlist
            </Link>

               <Link to="/login" className="nav-link">Sign In</Link>

            <select className="lang-dropdown">
                <option >EN</option>
                <option>ES</option>
                <option>FR</option>
                <option>DE</option>
            </select>
        
    </nav>

    </div>
  )
}

export default MBdNav
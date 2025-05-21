// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

function Navbar() {
  const { user, login, logout } = useAuthStore((s) => s);
  const fakeUser = { id: 1, name: 'Wassim', token: 'Triki' };

  return (
    <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>

      {user && (
        <NavLink
          to="/posts"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Posts
        </NavLink>
      )}

      <div style={{ marginLeft: 'auto' }}>
        {user ? (
          <>
            <span>
              Hi, <b>{user.name}</b>
            </span>
            <button onClick={logout} style={{ marginLeft: 8 }}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => login(fakeUser)}>
            Login as {fakeUser.name}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

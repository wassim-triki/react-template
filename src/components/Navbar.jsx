import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>
      <NavLink
        to="/posts"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Posts
      </NavLink>
    </nav>
  );
}
export default Navbar;

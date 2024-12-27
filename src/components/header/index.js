import '../../style/header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link className='logo' to="/">The Movie</Link>
    </header>
  )
}

export default Header;
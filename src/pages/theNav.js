import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import VerifyEmail from '../Auth/VerifyEmail';
import Logout from '../Auth/Logout';
import ThemeToggle from './themeToggle';
import { useSelector } from 'react-redux';

export default function TheNav() {
    const isPremieum = useSelector((state)=> state.expense.premieum)
    return (
        <div>
            <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/profile">Profile Page</Nav.Link>
            <Nav.Link href="#"><VerifyEmail /></Nav.Link>
            <Nav.Link href="/dailyexp">Daily Expenses</Nav.Link>
            <Nav.Link href="#"><Logout /></Nav.Link>
            {isPremieum && <Nav.Link href="#"><ThemeToggle /></Nav.Link>}
            
          </Nav>
        </Container>
      </Navbar>
        </div>

    )
}
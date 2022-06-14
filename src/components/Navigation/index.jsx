import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

function Navigation() {
  const { id, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
  };

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">
        EMERCE 2104
      </NavbarBrand>
      <Nav className="me-auto" navbar>
        {id ? (
          <UncontrolledDropdown inNavbar nav>
            <DropdownToggle caret nav>
              Hello, {username}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Cart</DropdownItem>
              <DropdownItem>Transaction</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={onLogoutClick}>Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        ) : (
          <>
            <NavItem>
              <NavLink tag={Link} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/register">
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/note">
                Note
              </NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default Navigation;

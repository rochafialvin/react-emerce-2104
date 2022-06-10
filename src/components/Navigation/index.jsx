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

function Navigation() {
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">
        EMERCE 2104
      </NavbarBrand>
      <Nav className="me-auto" navbar>
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
      </Nav>
    </Navbar>
  );
}

export default Navigation;

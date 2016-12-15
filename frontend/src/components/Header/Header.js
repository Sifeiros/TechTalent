import React from 'react';
import {
  Button,
  Nav,
  Navbar,
  NavItem
} from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import './Header.scss';

export const Header = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <LinkContainer to='/'>
          <Button bsStyle='link'>TechTalent</Button>
        </LinkContainer>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullLeft>
        <IndexLinkContainer to='/'>
          <NavItem>Home</NavItem>
        </IndexLinkContainer>
        <LinkContainer to='/counter'>
          <NavItem>Counter</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

);

export default Header;

import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import NavItem from 'react-bootstrap/NavItem';

const Header = () => (
    <header>
        <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#">Stonks Reader</Navbar.Brand>

        </Navbar>
    </header>
);

export default Header;

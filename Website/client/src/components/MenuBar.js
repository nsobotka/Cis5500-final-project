import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "shards-react";

class MenuBar extends React.Component {
    render() {
        return (
            <Navbar type="dark" theme="success" expand="md">
                <Nav navbar>
                    <NavItem>
                        <NavLink active href="/">
                            CIS 550 Spotify
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active href="/">
                            Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active href="/artists">
                            Artists
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active href="/songs">
                            Songs
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active href="/albums">
                            Albums
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default MenuBar
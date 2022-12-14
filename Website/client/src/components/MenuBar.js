import React from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink
} from "shards-react";

// Bar at the top of the screen that lets you switch pages
class MenuBar extends React.Component {
    render() {
        return (
            <Navbar type="dark" theme="success" expand="md">
                <Nav navbar>
                    <NavItem>
                        <NavLink active href="/map">
                            CIS 550 Spotify
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active href="/map">
                            Map
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active href="/">
                            Country
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
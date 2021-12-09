import React from "react";
import { MenuIcon } from "@heroicons/react/solid";
import { LogoutIcon, HomeIcon } from "@heroicons/react/outline";
import { Menu } from '@headlessui/react';
import { Link } from "react-router-dom";

const menulinks = [
    {
        href: '/decks',
        text: 'Decks'
    }
];

const accountLinks = [
    {
        href: '/account',
        text: 'My Account',
        icon: <HomeIcon className="w-5 h-5 mr-2 text-indigo-600 group-hover:text-white" />
    },
    {
        href: '/logout',
        text: 'Logout',
        icon: <LogoutIcon className="w-5 h-5 mr-2 text-indigo-600 group-hover:text-white" />
    }
];

const Header = () => {

    const items = menulinks.map((link, index) => 
        <li key={`menuLink-${index}`}><Link to={link.href}>{link.text}</Link></li>
        
    );

    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-white">
            <nav className="relative flex items-center justify-between w-full max-w-screen-xl mx-auto h-full px-2">
                {/* logo */}
                <Link to="/" className="flex items-center text-lg font-semibold text-indigo-600 mr-8">
                    <img src="/img/logo64.png" alt="App logo" className="w-8 mr-2" />
                    Cards memory
                </Link>
                {/* links */}
                <ul className="hidden md:block md:flex-grow">
                    { items }
                </ul>
                {/* user account */}
                <DropDown className="hidden md:block" smallScreen={false} links={accountLinks} >
                    <img className="rounded-full w-10 h-10" src="https://picsum.photos/40/40" alt="User Avatar" />
                </DropDown>
                {/* mobile */}
                <DropDown className="block md:hidden" smallScreen={true} links={menulinks}>
                    <MenuIcon className="w-10 h-10"/>
                </DropDown>
            </nav>
        </header>
    )
}

function DropDown(props) {

    const { className, smallScreen, links } = props;

    const items = links.map((link, index) => 
        <Menu.Item key={`dropDown-${index}`}>
            <DropDownLink href={link.href}>
                {link.icon}
                {link.text}
            </DropDownLink>
        </Menu.Item>
    );

    return (
      <Menu>
        <Menu.Button className={className}>
            {props.children}
        </Menu.Button>
        <Menu.Items className={
            smallScreen ? "absolute flex flex-col right-0 top-16 flex flex-col p-2 w-full md:hidden bg-white"
                        : "absolute hidden md:flex flex-col right-2 top-16 p-2 shadow-md rounded w-64 bg-white"
        }>
        { items }
        </Menu.Items>
      </Menu>
    )
  }

const DropDownLink = (props) => {

    const { href } = props;

    return (
        <Link to={href} className={`p-1 rounded group hover:bg-indigo-600`}>
            <span className="flex items-center group-hover:text-white after:block after:h-1">
                {props.children}
            </span>
        </Link>
    )
}

export default Header;

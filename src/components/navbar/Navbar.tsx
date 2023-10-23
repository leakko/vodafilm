import React from 'react';
import NavbarItem from '../navbar-item/NavbarItem';
import styled from 'styled-components';

interface Props {
	items: string[];
}

const NavbarContainer = styled.ul`
	display: flex;
	list-style: none;
`;

const Navbar: React.FC<Props> = ({ items }) => {
	return (
		<NavbarContainer>
			{items.map((item) => (
				<NavbarItem key={item}>
					<a>{item}</a>
				</NavbarItem>
			))}
		</NavbarContainer>
	);
};

export default Navbar;

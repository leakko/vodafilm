import React from 'react';
import styled from 'styled-components';
import menuItems from '../../assets/mocks/menu.json';

interface MenuItemType {
	id: number;
	route: string;
	title: string;
}

const Nav = styled.nav`
	display: flex;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
`;

const MenuList = styled.ul`
	display: flex;
	list-style: none;
	margin: 0;
	padding: 0;
`;

const MenuItem = styled.li`
	margin-right: 20px;
	&:last-child {
		margin-right: 0;
	}
`;

const MenuLink = styled.a`
	text-decoration: none;
	color: ${({ theme }) => theme.colors.secondary};
	font-weight: bold;
`;

const NavBar: React.FC = () => (
	<Nav>
		<MenuList>
			{menuItems.map((item: MenuItemType) => (
				<MenuItem key={item.id}>
					<MenuLink href={item.route}>{item.title}</MenuLink>
				</MenuItem>
			))}
		</MenuList>
	</Nav>
);

export default NavBar;

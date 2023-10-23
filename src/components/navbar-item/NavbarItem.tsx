import React from 'react';
import styled from 'styled-components';

interface Props {
	children: React.ReactNode;
}

const NavbarItemContainer = styled.li`
	margin: 0 5px;
	&:hover {
		cursor: pointer;
	}
`;

const NavbarItem: React.FC<Props> = ({ children }) => {
	return <NavbarItemContainer>{children}</NavbarItemContainer>;
};

export default NavbarItem;

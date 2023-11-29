import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface DropdownProps {
	$isOpen: boolean;
}

const Wrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const UserIcon = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const Dropdown = styled.nav<DropdownProps>`
	display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
	flex-direction: column;
	position: absolute;
	top: 100%;
	right: 0;
	background-color: #fff;
	border: 1px solid #ddd;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DropdownList = styled.ul`
	margin: 0;
	padding: 0;
	list-style-type: none;
`;

const DropdownItem = styled.li`
	color: black;
	padding: 10px 20px;
	cursor: pointer;
	&:hover {
		background-color: #f0f0f0;
	}
`;

const UserMenu: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => setIsOpen((prev) => !prev);

	return (
		<Wrapper onClick={toggleMenu}>
			<UserIcon>Bienvenido, Marcos</UserIcon>
			<Dropdown $isOpen={isOpen}>
				<DropdownList>
					<Link to={'/favorites'} style={{ textDecoration: 'none' }}><DropdownItem>Favoritos</DropdownItem></Link>
					<DropdownItem>Logout</DropdownItem>
				</DropdownList>
			</Dropdown>
		</Wrapper>
	);
};

export default UserMenu;

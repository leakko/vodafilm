import React from 'react';
import styled from 'styled-components';
import Image from '../image/Image';
import NavBar from '../navbar/NavBar';
import UserMenu from '../user-menu/UserMenu';

const HeaderContainer = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	background-color: #f0f0f0;
`;

const Header: React.FC = () => (
	<HeaderContainer>
		<Image src="/" alt="Logo" width={150} isClickable={true} href="/" />
		<NavBar />
		<UserMenu />
	</HeaderContainer>
);

export default Header;

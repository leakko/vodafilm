import React from 'react';
import styled from 'styled-components';
import movieLogo from '../../assets/img/movie.png';
import Image from '../image/Image';
import NavBar from '../navbar/Navbar';
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
		<div style={{ width: '150px' }}>
			<Image src={movieLogo} alt="Logo" width={30} isClickable={true} href="/" />
		</div>
		<NavBar />
		<UserMenu />
	</HeaderContainer>
);

export default Header;

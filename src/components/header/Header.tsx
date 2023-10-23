import React from 'react';
import styled from 'styled-components';
import Image from '../image/Image';
import Navbar from '../navbar/Navbar';

const HeaderContainer = styled.header`
	padding: 1rem;
	background-color: #bccbff;
	height: 2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Header: React.FC = () => {
	return (
		<HeaderContainer>
			<Image
				alt="logo"
				src="https://imagensemoldes.com.br/wp-content/uploads/2020/06/Movie-Logo-Cinema-PNG.png"
				width="35px"
			/>
			<Navbar items={['Todas', 'Suspense', 'Comedia', 'Sci-Fi']} />
		</HeaderContainer>
	);
};

export default Header;

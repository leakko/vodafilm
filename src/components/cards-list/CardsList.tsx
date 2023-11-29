import React from 'react';
import styled from 'styled-components';

interface Props {
	children: React.ReactNode;
}

const StyledCardList = styled.ul`
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	column-gap: 20px;
	row-gap: 20px;
	justify-content: center;
	padding-inline-start: 0;
`;

const CardsList: React.FC<Props> = ({ children }) => {
	return <StyledCardList>{children}</StyledCardList>;
};

export default CardsList;

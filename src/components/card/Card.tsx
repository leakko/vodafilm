import React from 'react';
import styled from 'styled-components';

interface Props {
	children: React.ReactNode;
}

const StyledCard = styled.li`
	border-radius: 20px;
	box-shadow: 3px 3px 3px grey;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: fit-content;
	background-color: #f0f0f0f0;
	position: relative;
`;

const Card: React.FC<Props> = ({ children }) => {
	return <StyledCard>{children}</StyledCard>;
};

export default Card;

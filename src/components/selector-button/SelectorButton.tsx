import React from 'react';
import { styled } from 'styled-components';

interface Props extends React.LiHTMLAttributes<HTMLLIElement> {
	selected: boolean;
	children: React.ReactNode;
}

interface SelectorProps {
	$selected: boolean;
}

const StyledSelectorButton = styled.li<SelectorProps>`
	list-style: none;
	padding: 10px;
	background-color: ${({ $selected }) => ($selected ? '#747272ee' : '#b1aeaeec')};
	color: white;
	border-radius: 25px;
	direction: ltr;
	text-align: start;
	&:hover {
		cursor: pointer;
	}
`;

const SelectorButton: React.FC<Props> = ({ children, selected, ...props }) => {
	return (
		<StyledSelectorButton $selected={selected} {...props}>
			{children}
		</StyledSelectorButton>
	);
};

export default SelectorButton;

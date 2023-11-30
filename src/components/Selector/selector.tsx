import React from 'react';
import { styled } from 'styled-components';

interface Props extends React.LiHTMLAttributes<HTMLLIElement> {
	selected: boolean;
	children: React.ReactNode;
}

interface SelectorProps {
	$selected: boolean;
}

const StyledSelector = styled.li<SelectorProps>`
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

const Selector: React.FC<Props> = ({ children, selected, ...props }) => {
	return (
		<StyledSelector $selected={selected} {...props}>
			{children}
		</StyledSelector>
	);
};

export default Selector;

import React from 'react';
import styled from 'styled-components';
import { MovieCategory } from '../../models/movies-categories';
import { ShowCategory } from '../../models/shows-categories';

interface Props {
	categories: MovieCategory[] | ShowCategory[];
	setCategory: (cat: MovieCategory | ShowCategory) => void;
	selectedCategory: MovieCategory | ShowCategory;
}

interface itemProps {
	$selected: boolean;
}

const StyledCategoriesMenu = styled.ul`
	width: 150px;
	list-style: none;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-end;
	row-gap: 10px;
	height: 70vh;
	overflow-y: auto;
	direction: rtl;
	padding-left: 15px;
`;

const StyledCategoriesMenuItem = styled.li<itemProps>`
	padding: 10px;
	background-color: ${({ $selected }) => ($selected ? '#747272ee' : '#b1aeaeec')};
	color: white;
	border-radius: 25px;
	direction: ltr;
	&:hover {
		cursor: pointer;
	}
`;

const CategoriesMenu: React.FC<Props> = ({ categories, setCategory, selectedCategory }) => {
	return (
		<>
			<h2 style={{ textAlign: 'center', width: '150px' }}>Categories</h2>
			<StyledCategoriesMenu>
				{categories.map((category) => (
					<StyledCategoriesMenuItem
						key={category.id}
						onClick={() => setCategory(category)}
						$selected={category.id === selectedCategory.id}>
						{category.name}
					</StyledCategoriesMenuItem>
				))}
			</StyledCategoriesMenu>
		</>
	);
};

export default CategoriesMenu;

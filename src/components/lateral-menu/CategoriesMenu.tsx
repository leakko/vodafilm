import React from 'react';
import styled from 'styled-components';
import { MovieCategory } from '../../models/movies-categories';
import { ShowCategory } from '../../models/shows-categories';
import SelectorButton from '../selector-button/SelectorButton';

interface Props {
	categories: MovieCategory[] | ShowCategory[];
	setCategory: (cat: MovieCategory | ShowCategory) => void;
	selectedCategory: MovieCategory | ShowCategory;
}

const StyledCategoriesMenu = styled.ul`
	width: 200px;
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

const CategoriesMenu: React.FC<Props> = ({ categories, setCategory, selectedCategory }) => {
	return (
		<>
			<h2 style={{ textAlign: 'center', width: '150px' }}>Categories</h2>
			<StyledCategoriesMenu>
				{categories.map((category) => (
					<SelectorButton
						key={category.id}
						onClick={() => setCategory(category)}
						selected={category.id === selectedCategory.id}>
						{category.name}
					</SelectorButton>
				))}
			</StyledCategoriesMenu>
		</>
	);
};

export default CategoriesMenu;

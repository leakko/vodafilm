import React, { useState } from 'react';
import styled from 'styled-components';
import { Movie } from '../../models/movie';
import { Show } from '../../models/show';
import Dialog from '../dialog/Dialog';

interface Props {
	children: React.ReactNode;
	typeOfItem: 'movie' | 'show';
	item: Movie | Show;
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
	&:hover {
		cursor: pointer;
	}
`;

const Card: React.FC<Props> = ({ children, item, typeOfItem }) => {
	const [openModal, setOpenModal] = useState(false);

	const onOpenClick = (e: React.MouseEvent) => {
		if (!(e.target as HTMLElement).classList.contains('heart')) {
			setOpenModal(true);
		}
	};

	return (
		<>
			<StyledCard onClick={onOpenClick}>{children}</StyledCard>
			<Dialog open={openModal} onCloseClick={() => setOpenModal(false)}>
				<>
					<img src={`https://image.tmdb.org/t/p/w200${item?.poster_path}`}></img>
					{typeOfItem === 'movie' ? (
						<>
							<h2>Title</h2>
							<p>{(item as Movie)?.title}</p>
						</>
					) : (
						<>
							<h2>Name</h2>
							<p>{(item as Show)?.name}</p>
						</>
					)}
					<h2>Overview</h2>
					<p>{item?.overview}</p>
					<h2>Popularity</h2>
					<p>{item?.popularity}</p>
					<h2>Rate</h2>
					<p>{item?.vote_average}</p>
				</>
			</Dialog>
		</>
	);
};

export default Card;

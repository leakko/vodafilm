import React from 'react';
import styled from 'styled-components';

interface Props {
	alt: string;
	src: string;
	width: string;
	height?: string;
	clickable?: boolean;
}

export const ImageContainer = styled.img<Props>`
	width: ${({ width }) => width};
	height: ${({ height, width }) => height ?? width};
	&:hover {
		cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
	}
`;

export const Image: React.FC<Props> = (props) => {
	return <ImageContainer {...props} />;
};

export default Image;

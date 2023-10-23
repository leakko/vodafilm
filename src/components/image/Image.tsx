import React from 'react';
import styled from 'styled-components';

interface Props {
	alt: string;
	src: string;
	width: string;
	heigth?: string;
}

interface ContainerProps {
	width: string;
	height?: string;
}

export const ImageContainer = styled.img<ContainerProps>`
	width: ${({ width }) => width};
	height: ${({ height, width }) => height ?? width};
`;

export const Image: React.FC<Props> = (props) => {
	return <ImageContainer {...props} />;
};

export default Image;

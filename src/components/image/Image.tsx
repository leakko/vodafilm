// src/components/Image.tsx
import React from 'react';
import styled from 'styled-components';

interface ImageProps {
	src: string;
	alt: string;
	width: number;
	height?: number;
	isClickable?: boolean;
	href?: string;
}

const StyledImage = styled.img<{ width: number; height: number }>`
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
`;

const StyledAnchor = styled.a``;

const Image: React.FC<ImageProps> = ({ src, alt, width, height = width, isClickable, href }) => {
	const image = <StyledImage src={src} alt={alt} width={width} height={height} />;
	return isClickable && href ? <StyledAnchor href={href}>{image}</StyledAnchor> : image;
};

export default Image;

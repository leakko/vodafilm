import React from 'react';
import { styled } from 'styled-components';

const StyledFooter = styled.footer`
	max-width: 1000px;
	margin: 25px auto;
	text-align: center;
	margin-top: 50px;
`;

const Footer: React.FC = () => {
	return (
		<StyledFooter>
			<p>Created by Web Engineering Team</p>
		</StyledFooter>
	);
};

export default Footer;

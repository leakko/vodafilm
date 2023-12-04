import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface props {
	children: React.ReactNode;
	open: boolean;
	onCloseClick: () => void;
}

const StyledDialog = styled.dialog`
	position: fixed;
	width: 80vw;
	height: 80vh;
	max-width: 1000px;
	top: 50px;
	text-align: center;
`;

const Dialog: React.FC<props> = ({ children, open, onCloseClick }) => {
	const dialog = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (open) {
			dialog.current?.showModal();
			document.body.style.overflowY = 'hidden';
		} else {
			dialog.current?.close();
			document.body.style.overflowY = 'auto';
		}
	}, [open]);

	return (
		<>
			{createPortal(
				<StyledDialog ref={dialog}>
					<>
						<div
							onClick={() => onCloseClick()}
							style={{ display: 'flex', justifyContent: 'flex-end', cursor: 'pointer' }}>
							Cerrar
						</div>
						{children}
					</>
				</StyledDialog>,
				document.body
			)}
		</>
	);
};

export default Dialog;

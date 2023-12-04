import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface props {
	children: React.ReactNode;
}

const Dialog: React.FC<props> = ({ children }) => {
	const [open] = useState<boolean>(false);
	const dialog = useRef<HTMLDialogElement>(null);
	useEffect(() => {
		if (open) {
			dialog.current?.showModal();
		} else {
			dialog.current?.close();
		}
	}, [open]);

	return <>{createPortal(<dialog ref={dialog}>{children}</dialog>, document.body)}</>;
};

export default Dialog;

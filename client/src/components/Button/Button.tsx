import React from 'react';

import classes from './button.module.css';

export interface IButtonProps {
    children: React.ReactNode;
    type: 'success' | 'cancel' | 'danger' | 'info';
    handleClick?: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void;
}

function Button({ children, type, handleClick }: IButtonProps) {
    const buttonClasses = [classes.buttonContainer, classes[type]];
    return (
        <button className={buttonClasses.join(' ')} onClick={handleClick}>
            {children}
        </button>
    );
}

export default Button;

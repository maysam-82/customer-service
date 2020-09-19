import React from 'react';
import { IToast } from '../../types/toast';

import classes from './toast.module.css';

export interface IToastProps {
    toasts: IToast[];
}

function Toast({ toasts }: IToastProps) {
    const renderToasts =
        toasts.length > 0
            ? toasts.map(({ toastId, toastMessage, toastType = 'danger' }) => {
                  const toastClasses = [classes.toastAlert, classes[toastType]];
                  return (
                      <div className={toastClasses.join(' ')} key={toastId}>
                          {toastMessage}
                      </div>
                  );
              })
            : null;
    return <div>{renderToasts}</div>;
}

export default Toast;

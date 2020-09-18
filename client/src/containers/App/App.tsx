import React from 'react';
import { connect } from 'react-redux';
import Toast from '../../components/Toast/Toast';
import { IStoreState } from '../../redux/reducers';
import { IToast } from '../../types/toast';

interface IAppProps {
    toasts: IToast[];
}

function App({ toasts }: IAppProps) {
    return (
        <div>
            <Toast toasts={toasts} />
        </div>
    );
}

const mapStateToProps = (state: IStoreState) => ({
    toasts: state.toasts,
});

export default connect(mapStateToProps)(App);

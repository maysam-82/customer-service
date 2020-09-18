import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { searchCustomers } from '../../redux/actions/customers/customers';

import classes from './search.module.css';

interface ISearchProps {
    searchCustomers: Function;
}

export function Search({ searchCustomers }: ISearchProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

    // Watch for changing `searchTerm`
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        // As soon as `searchTerm` is changed, cleanup function is invoked.
        return () => {
            clearTimeout(timeoutId);
        };
    }, [searchTerm]);

    // Watch for changing `debouncedSearchTerm`
    useEffect(() => {
        searchCustomers(debouncedTerm);
    }, [debouncedTerm, searchCustomers]);

    return (
        <div className={classes.searchContainer}>
            <form
                onSubmit={(event) => event.preventDefault()}
                className={classes.searchForm}
            >
                <div className={classes.searchInputContainer}>
                    <input
                        type="text"
                        onChange={(event) => setSearchTerm(event.target.value)}
                        value={searchTerm}
                        className={classes.searchInput}
                        placeholder="Firstname or Lastname"
                    />
                    <div className={classes.searchInputIcon}>
                        <i className="fas fa-search"></i>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default connect(null, { searchCustomers })(Search);

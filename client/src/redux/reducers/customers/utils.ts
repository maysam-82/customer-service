import { ICustomer } from '../../../types/customers';

// returns brand new array which does not contains deleted customer
export const removeCustomer = (
    customers: ICustomer[],
    deleteCustomerId: number
): ICustomer[] => {
    return customers.filter((customer) => customer.id !== deleteCustomerId);
};

// finds an old customer and replaces with updated one.
export const replaceCustomer = (
    customers: ICustomer[],
    updatedCustomer: ICustomer
): ICustomer[] => {
    return customers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
};

export const setSearchResult = (customers: ICustomer[], searchTerm: string) => {
    if (!customers) return [];
    return (
        customers &&
        customers.filter(
            (customer) =>
                customer.firstName.includes(searchTerm) ||
                customer.lastName.includes(searchTerm)
        )
    );
};

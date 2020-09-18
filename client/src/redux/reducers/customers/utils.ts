import { ICustomer } from '../../../types/customers';

// returns brand new array which does not contains deleted customer
export const removeCustomer = (
    customers: ICustomer[],
    deleteCustomerId: number
): ICustomer[] => {
    return customers.filter((customer) => customer.id !== deleteCustomerId);
};

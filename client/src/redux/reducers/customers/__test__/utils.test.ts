import { testCustomers } from '../../../../fixtures/testData/testData';
import { setSearchResult } from '../utils';

describe('setSearchResult function', () => {
    it('should return an empty array if there is no customer', () => {
        const searchResult = setSearchResult(null, 'test');
        expect(searchResult).toEqual([]);
    });
    it('should return a array of result with search term `earth`', () => {
        const testResult = [
            {
                id: 1,
                firstName: 'earth',
                lastName: 'sky',
                dob: '2000-01-01',
            },

            {
                id: 3,
                firstName: 'planet',
                lastName: 'earth',
                dob: '2002-03-03',
            },
        ];
        const searchResult = setSearchResult(testCustomers, 'earth');
        expect(searchResult).toEqual(testResult);
    });
});

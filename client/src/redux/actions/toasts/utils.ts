import crypto from 'crypto';

// Creates unique string with length of 10.
export const getUniqueId = (): string => {
    return crypto.randomBytes(10).toString('hex');
};

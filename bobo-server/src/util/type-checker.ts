export const isObject = (value: any) => {
    return value && typeof value === 'object' && value.constructor === Object;
};

export const isString = (value: any) => {
    return typeof value === 'string';
};

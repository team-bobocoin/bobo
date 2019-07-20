import _ from 'lodash';

export const queryParams = (obj: any) => {
    _.forEach(obj, (value, key) => {
        if (typeof value === 'object') {
            obj[key] = JSON.stringify(value);
        }
    });

    return obj;
};

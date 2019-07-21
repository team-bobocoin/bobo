import _ from 'lodash';

export const build = (params: any) => {
    const options: any = {};
    let projection: any;

    if (params.select) {
        projection = params.select;
    }

    if (params.limit) {
        options.limit = parseInt(params.limit, 10);
    }

    if (params.skip) {
        options.skip = parseInt(params.skip, 10);
    }

    try {
        options.sort = JSON.parse(params.sort);
    } catch (err) {
        // Nothing here
    }

    try {
        const query = JSON.parse(params.query);
        return [query, projection, options];
    } catch (err) {
        return [params.query, projection, options];
    }
};

export const populate = (promise: any, paramsPopulates: any) => {
    try {
        const populates = JSON.parse(paramsPopulates);

        _.forEach(populates, (i) => {
            promise = promise.populate(i);
        });

        return promise;
    } catch (err) {
        return promise;
    }
};

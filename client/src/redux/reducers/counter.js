const defaultPagination = {
    count: 0
};

const counter = (state = defaultPagination, action) => {
    switch (action.type) {
        case 'INCREMENT':
            let res = {
                count: action.data ? action.data : state.count,
            };
            state = res;
            return state;
        default:
            return state;
    }
};

export {
    counter
};
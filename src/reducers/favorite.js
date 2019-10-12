let defaultData = {
    items: []
};

export default function modal(state = defaultData, action) {
    switch(action.type)
    {
        case 'UPDATE_FAVORITE':
            return {items: action.payload};
        case 'CLEAR_MODAL_DATA':
            return defaultData;
        default:
            return state;
    }
}

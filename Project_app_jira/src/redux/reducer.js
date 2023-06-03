const innitialState = {
  tableData: [],
};

const tableReducer = (state = innitialState, action) => {
  switch (action.type) {
    case "FETCH_TABLE_DATA":
      return {
        ...state,
        tableData: action.payload,
      };
    default:
      return state;
  }
};

export default tableReducer;

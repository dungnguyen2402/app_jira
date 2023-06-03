export const fetchTableData = (data) => {
  return {
    type: "FETCH_TABLE_DATA",
    payload: data,
  };
};

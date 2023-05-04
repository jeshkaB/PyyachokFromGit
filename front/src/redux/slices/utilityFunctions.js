const defaultCaseReject = (state, action) => {
    const [type] = action.type.split('/').splice(-1);
    if (type === 'rejected') state.errors = action.payload;
    else state.errors = null;
   };

export {defaultCaseReject};

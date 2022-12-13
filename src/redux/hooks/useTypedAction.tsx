import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as createAsyncAction from '../createAsyncThunk/createAsyncThunk';

const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(createAsyncAction, dispatch);
};

export default useActions;

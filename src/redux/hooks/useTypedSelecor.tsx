import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { IRootState } from '../store';

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

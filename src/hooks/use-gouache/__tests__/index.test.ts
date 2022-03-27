import { renderHook } from '@testing-library/react-hooks';
import { useGouache } from '..';

describe('useCounter tests', () => {
  it('should be defined', () => {
    expect(useGouache).toBeDefined();
  });

  it('isLoading should be set to true when initialized.', () => {
    const { result } = renderHook(() => useGouache('MY_API_KEY'));
    expect(result.current.isLoading).toBe(true);
  });
});

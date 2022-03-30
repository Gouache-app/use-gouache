import { renderHook } from '@testing-library/react-hooks';

import { useGouache } from '..';
import defaultStyles from './__fixtures__/default-styles.json';

const API_KEY = 'GOU-MY_API_KEY';

describe('useCounter tests', () => {
  describe('initial states', () => {
    it('should be defined', () => {
      expect(useGouache).toBeDefined();
    });

    it('Show the initial state when there is no defaultStyles.', () => {
      const { result } = renderHook(() => useGouache({ apiKey: API_KEY }));
      // Initial state
      expect(result.current.isLoading).toBe(true);
      expect(result.current.styles).toStrictEqual({});
    });

    it('Show the initial state when there is a defaultStyles.', () => {
      const { result } = renderHook(() => useGouache({ apiKey: API_KEY, defaultStyles }));
      // Initial state
      expect(result.current.isLoading).toBe(true);
      expect(result.current.styles).toStrictEqual(defaultStyles);
    });

    it("Show the initial state when there is a defaultStyles and we're using these Default Styles.", () => {
      const { result } = renderHook(() =>
        useGouache({ apiKey: API_KEY, defaultStyles, useDefaultStyles: true }),
      );
      // Initial state
      expect(result.current.isLoading).toBe(false);
      expect(result.current.styles).toStrictEqual(defaultStyles);
    });
  });
});

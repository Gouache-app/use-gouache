import { renderHook } from '@testing-library/react-hooks';
import { io } from 'socket.io-client';

import { useGouache } from '..';
import { SOCKET_URI } from '../configs';
import defaultStyles from './__fixtures__/default-styles.json';

const API_KEY = 'GOU-MY_API_KEY';

jest.mock('socket.io-client', () => ({
  ...(jest.requireActual('socket.io-client') as any),
  __esModule: true,
  io: jest.fn(() => ({
    on: jest.fn(),
  })),
}));

describe('useCounter tests', () => {
  describe('initial states', () => {
    it('should be defined', () => {
      expect(useGouache).toBeDefined();
    });

    it('Show the initial state when there is no defaultStyles.', () => {
      const { result } = renderHook(() => useGouache({ apiKey: API_KEY }));
      // Initial state
      expect(result.current.isLoading).toBe(true);
      expect(result.current.styles).toBe(undefined);
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

    it('The socket should connect to the server.', () => {
      const MockIo = jest.fn(() => ({ on: jest.fn() }));
      (io as jest.Mock).mockImplementation(MockIo);
      renderHook(() => useGouache({ apiKey: API_KEY }));

      // Make sure io is being called with the socket uri
      expect(MockIo).toHaveBeenCalledWith(SOCKET_URI);
    });
  });
});

import { renderHook } from '@testing-library/react-hooks';
import { io } from 'socket.io-client';

import { useGouache } from '..';
import { SOCKET_URI } from '../configs';
import { getApiKeyFromUrlParams } from '../get-api-key-from-url-params';
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

    it('The socket should not connect to the server if useDefaultStyles === true.', () => {
      const MockIo = jest.fn(() => ({ on: jest.fn() }));
      (io as jest.Mock).mockImplementation(MockIo);
      renderHook(() => useGouache({ apiKey: API_KEY, defaultStyles, useDefaultStyles: true }));

      // Make sure io is not being called
      expect(MockIo).not.toHaveBeenCalled();
    });

    it(`The socket should connect to the server if useDefaultStyles === true if we're overriding the API key using the URL params.`, () => {
      // Adding the URL params
      const location = { ...window.location, search: `?gouache-api-key=${API_KEY}` };
      Object.defineProperty(window, 'location', { writable: true, value: location });

      const MockIo = jest.fn(() => ({ on: jest.fn() }));
      (io as jest.Mock).mockImplementation(MockIo);
      renderHook(() => useGouache({ apiKey: API_KEY, defaultStyles, useDefaultStyles: true }));

      // Make sure io is being called with the socket uri
      expect(MockIo).toHaveBeenCalledWith(SOCKET_URI);
    });
  });

  describe('override api keys with URL params', () => {
    it('override if there is a search param starting with "gouache-api-key"', () => {
      const location = { ...window.location, search: `?gouache-api-key=${API_KEY}` };
      Object.defineProperty(window, 'location', { writable: true, value: location });

      const getOverrideApiKey = getApiKeyFromUrlParams();
      expect(getOverrideApiKey).toBe(API_KEY);
    });

    it('did not override if there is no search param starting with "gouache-api-key"', () => {
      const location = { ...window.location, search: `?product-id=item1234` };
      Object.defineProperty(window, 'location', { writable: true, value: location });

      const getOverrideApiKey = getApiKeyFromUrlParams();
      expect(getOverrideApiKey).toBeNull();
    });
  });
});

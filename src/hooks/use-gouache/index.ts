import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { SOCKET_URI } from './configs';
import { SOCKET_EVENTS } from './events';

/**
 * The `useGouache` hook let you automatically update your styles when changing it on the Gouache app.
 *
 * @arg      {Object.<string, any>} settings
 *
 * @arg      {string} settings.apiKey
 *           Api Key of your Gouache project.
 *
 * @arg      {boolean} settings.useDefaultStyles
 *           Whether to use the default styles or fetching the styles from Gouache.
 *
 * @arg      {Object} settings.defaultStyles
 *           Default Styles object
 *
 * @return   {Object}
 *           Object with the styles object and the loading state.
 *
 * @property {Object} styles
 *           The styles object that is the output of your Gouache project.
 *
 * @property {boolean} isLoading
 *           Whether the hook retrieved the data or if it still getting it.
 *
 * @example
 * const App = () => {
 *   const { styles, isLoading } = useGouache({ apiKey: 'MY_GOUACHE_API_KEY' });

 *   if (isLoading) {
 *     return <p>Loading...</p>;
 *   }
 * 
 *   // Pretty print the JSON object
 *   return (
 *     <>
 *       <p>
 *         <pre>{JSON.stringify(styles, null, 2)}</pre>
 *       </p>
 *     </>
 *   );
 * };
 */
export const useGouache = ({
  apiKey,
  useDefaultStyles = false,
  defaultStyles,
}: {
  apiKey: string;
  useDefaultStyles?: boolean;
  defaultStyles?: object;
}): { styles?: object; isLoading: boolean } => {
  const ref = useRef<Socket>();
  const [stylesObject, setStylesObject] = useState<object | undefined>(defaultStyles);
  // If we're using the default styles, there is no loading state.
  const [isLoading, setIsLoading] = useState(!useDefaultStyles);

  useEffect(() => {
    // Don't connect to the server if we're using the default style
    if (useDefaultStyles) {
      return;
    }
    const socket = io(SOCKET_URI);

    socket.on('connect', () => {
      // Join the room when connecting.
      socket.emit(SOCKET_EVENTS.JOIN_ROOM, { apiKey });
    });

    socket.on('disconnect', () => {
      console.log('Gouache disconnected.');
    });

    socket.on('reconnect', () => {
      // Join the room when re-connecting.
      socket.emit(SOCKET_EVENTS.JOIN_ROOM, { apiKey });
    });

    // Listening to styles object updates
    socket.on(SOCKET_EVENTS.UPDATE_STYLES_OBJECT, (stylesObjectResponse: object) => {
      setStylesObject(stylesObjectResponse);
      setIsLoading(false);
    });
    ref.current = socket;
  }, []);

  return { styles: stylesObject, isLoading };
};

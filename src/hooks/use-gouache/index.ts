import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

import { SOCKET_URI } from './configs';
import { SOCKET_EVENTS } from './events';

/**
 * useGouache hook to help you setup your app using Gouache.
 *
 * @param    {string} apiKey
 *           Api Key of your Gouache project.
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
 *   const MyApp = () => {
 *     const { styles, isLoading } = useGouache("MY_GOUACHE_API_KEY");
 *
 *     if(isLoading){
 *        return <p>Loading...</p>;
 *     }
 *
 *     return (
 *       <>
 *         <p>{JSON.stringify(styles)}</p>
 *       </>
 *      )
 *    }
 */
export const useGouache = ({
  apiKey,
  useDefaultStyles = false,
  defaultStyles = {},
}: {
  apiKey: string;
  useDefaultStyles?: boolean;
  defaultStyles?: object;
}): { styles?: object; isLoading: boolean } => {
  const ref: any = useRef();
  const [stylesObject, setStylesObject] = useState<object>(defaultStyles);
  // If we're using the default styles, there is no loading state.
  const [isLoading, setIsLoading] = useState(!useDefaultStyles);

  useEffect(() => {
    const socket = io(SOCKET_URI);

    socket.on('disconnect', () => {
      console.log('disconnected');
    });

    socket.on('connect', () => {
      // Join the room when connecting.
      socket.emit(SOCKET_EVENTS.JOIN_ROOM, { apiKey }, () => {
        // Do something here?
      });
    });

    socket.on('reconnect', () => {
      // Join the room when re-connecting.
      socket.emit(SOCKET_EVENTS.JOIN_ROOM, { apiKey }, () => {
        // Do something here?
      });
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

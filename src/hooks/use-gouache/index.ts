import { useState, useRef, useEffect } from 'react';
import { io } from "socket.io-client";
import { SOCKET_EVENTS } from "./events";
import { SOCKET_URI } from "./configs";

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
export const useGouache = (apiKey: string): { styles?: object, isLoading: boolean } => {
  const ref: any = useRef();
  const [stylesObject, setStylesObject] = useState()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const socket = io(SOCKET_URI);

    socket.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.on("connect", () => {
      // Join the room when connecting.
      socket.emit(SOCKET_EVENTS.JOIN_ROOM, {apiKey}, () => {
        setIsLoading(false);
      });
    });

    socket.on("reconnect", () => {
      // Join the room when re-connecting.
      socket.emit(SOCKET_EVENTS.JOIN_ROOM, {apiKey}, () => {
        setIsLoading(false);
      });
    });

    // Listening to styles object updates
    socket.on(SOCKET_EVENTS.UPDATE_STYLES_OBJECT, (stylesObjectResponse: any) => {
      setStylesObject(stylesObjectResponse)
    });
    ref.current = socket;
  }, []);

  return { styles: stylesObject, isLoading };
}

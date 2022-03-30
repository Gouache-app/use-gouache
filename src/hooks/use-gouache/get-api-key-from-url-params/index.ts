const SEARCH_PARAM = 'gouache-api-key';

/** This function simply get the api key if there is one in the URL params */
export const getApiKeyFromUrlParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(SEARCH_PARAM);
};

import {loadingError, loadingState} from "./store/common.js";

export async function apiGet(url, opts) {


  return apiRequest(url, opts)

}

export async function apiPost(url, data, opts) {

  return apiRequest(url, {...opts, requestopts: {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
      ...(opts.requestopts||{}),
    body: JSON.stringify(data)
  }});
}

async function apiRequest(url, {authtoken, dispatch = function noop() {}, requestopts = {}, onError, background = false})
{
  dispatch(loadingError(null));
  !background && dispatch(loadingState(true));

  if(authtoken) {
    if(!requestopts.headers) requestopts.headers = {};
    requestopts.headers.Authorization = `Bearer ${authtoken}`
  }

  return new Promise(async (resolve, reject) => {

    try {
      const response = await fetch(`/api/${url}`, requestopts);

      if (response.ok) {
        !background && dispatch(loadingState(false));
        const hasResponseBody = response.headers.get("content-length") > 0;
        resolve(hasResponseBody ? response.json() : null);
      }

      else return handleError(response.statusText);
    }
    catch (error) {
      handleError('Network error');
    }

    function handleError(error) {
      console.log('[API]', error, onError);
      if(onError) {
        onError(error);
        !background && dispatch(loadingState(false));
      }
      else
        dispatch(loadingError(error));
    }
  })

}
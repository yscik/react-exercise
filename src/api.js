
export async function apiGet(url, opts) {
  return apiRequest(url, opts)

}

export async function apiPost(url, data, opts = {}) {

  return apiRequest(`/api/${url}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST', ...opts, body: JSON.stringify(data)});
}

async function apiRequest(url, opts) {
  const result = await fetch(`/api/${url}`, opts);

  if(result.ok)
    return result.json();

  else
    return null;
}
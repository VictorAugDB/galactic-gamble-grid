type FetchWeatherAPIProps = {
  path: string
  token?: string
  options?: RequestInit
}

export async function fetchAPI<T>({
  path,
  token,
  options,
}: FetchWeatherAPIProps): Promise<T> {
  try {
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      ...options,
    }

    // Build request URL
    const requestUrl = `${process.env.API_URL}${path}`

    if (options?.method === 'POST') {
      console.log(requestUrl, options.body)
    }

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions)
    const data = await response.json()

    return data
  } catch (error) {
    console.error(error)
    throw new Error(`Something went wrong..`)
  }
}

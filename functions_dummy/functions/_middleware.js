export const onRequestOptions = async () => {
    return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*'
        }
    })
}

export const onRequest = async (context) => {
    const response = await context.next()
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
}
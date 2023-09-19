export const onRequestGet = async (context) => {
    let results = []
    for (const key of (await context.env.TODOS.list()).keys) {
        results.push(JSON.parse(await context.env.TODOS.get(key.name)))
    }

    return Response.json({
        "todos": results
    })
}

export const onRequestPost = async (context) => {
    const body = await context.request.json()

    const timestamp = Math.floor(Date.now() / 1000)
    body.id = timestamp
    await context.env.TODOS.put(timestamp, JSON.stringify(body))

    return Response.json({
        "result": true,
        "id": timestamp,
    })
}
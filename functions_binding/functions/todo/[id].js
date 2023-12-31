export const onRequestPut = async (context) => {
    const body = await context.request.json()
    const id = context.params.id
    let data = await context.env.TODOS.get(id)

    if (data == null) {
        return Response.json({
            "result": false,
        }, {status: 404})
    }
    data = JSON.parse(data)

    if (typeof body.title !== "undefined") {
        data.title = body.title
    }
    if (typeof body.done !== "undefined") {
        data.done = body.done
    } 

    await context.env.TODOS.put(id, JSON.stringify(data))

    return Response.json({
        "result": true,
    })
}

export const onRequestDelete = async (context) => {
    const id = context.params.id

    await context.env.TODOS.delete(id)

    return Response.json({
        "result": true,
    })
}
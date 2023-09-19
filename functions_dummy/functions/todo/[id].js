export const onRequestPut = async (context) => {
    console.log(await context.request.json())
    console.log(context.params.id)

    return Response.json({
        "result": true,
    })
}

export const onRequestDelete = async (context) => {
    console.log(context.params.id)

    return Response.json({
        "result": true,
    })
}
export const onRequestPut = async (context) => {
    console.log(await context.request.json())
    console.log(context.params.id)

    return new Response(JSON.stringify({
        "result": true,
    }))
}

export const onRequestDelete = async (context) => {
    console.log(context.params.id)

    return new Response(JSON.stringify({
        "result": true,
    }))
}
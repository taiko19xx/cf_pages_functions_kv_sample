export const onRequestGet = async () => {
    return Response.json({
        "todos": [
            {
                "id": 1234567891,
                "title": "dummy_2",
                "done": false,
            },
            {
                "id": 1234567890,
                "title": "dummy_1",
                "done": true,
            },
        ]
    })
}

export const onRequestPost = async (context) => {
    console.log(await context.request.json())
    const timestamp = Math.floor(Date.now() / 1000)

    return Response.json({
        "result": true,
        "id": timestamp,
    })
}
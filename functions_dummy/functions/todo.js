export const onRequestGet = async () => {
    return new Response(JSON.stringify({
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
    }))
}

export const onRequestPost = async (context) => {
    console.log(await context.request.json())

    return new Response(JSON.stringify({
        "result": true,
        "id": 1234567892,
    }))
}
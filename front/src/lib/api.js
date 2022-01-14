const baseUrl = "http://localhost:3001";


export const signIn = async (body) => {
    const res = await fetch(`${baseUrl}/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(body)

    });
    return res.json();
}

export const Login = async (body) => {
    const res = await fetch(`${baseUrl}/sign-in/:email/:password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(body)
    });
    if (res) {
        return res.json();
    }
    return res.json("Email or password invalid")
}
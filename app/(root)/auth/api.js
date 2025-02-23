const api_url = process.env.NEXT_PUBLIC_API_URL

export const register = async (email, password) => {
        const response = await fetch(`${api_url}/users/register/`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Registration failed:", errorData);
            return errorData; 
        }
    
        const data = await response.json();
        console.log("User registered:", data);
        return data;
}

export const login = async (email, password) => {
    const response = await fetch(`${api_url}/users/login/`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        return errorData;
    }

    const data = await response.json()
    console.log(data)
    // Securely store tokens in HTTP-only cookies
    cookies().set("access_token", data.access, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });

    cookies().set("refresh_token", data.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
    });

    return data;
}

export const getAuthHeaders = () => {
    const token = cookies().get("access_token")?.value;
    return token ? { Authorization: `Bearer ${token}` } : {};
};
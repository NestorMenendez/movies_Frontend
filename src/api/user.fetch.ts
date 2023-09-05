import { URL_USER } from "../global/serverUrls";


export const createUser = async (getToken: any, user: any) => {
    const token = await getToken();
    const userMail = user?.email;
    console.log('entra en la creación de usuario')
    const formData = new FormData()
    formData.append('email', userMail);
    try {
        const response = await fetch(`${URL_USER}`,
            {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`,
                },
                body: formData
            })
        if (!response.ok) {
            throw new Error(`HTTP error!!! Status: ${response.status} `);
        }
        const user = await response.json();
        return user
    } catch {
        throw new Error("Error while sending user to mongoDB");
    }
}

export const verifyUser = async (getToken: any, user: any) => {
    const token = await getToken();
    const userMail = user?.email;
    try {
        const response = await fetch(`${URL_USER}` + `/${userMail}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const user = await response.json();
        return user;
    }
    catch {
        throw new Error("Error while getting movies from mongoDB user profile");
    }
};




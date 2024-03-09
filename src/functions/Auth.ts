
// const photoBoy = `https://avatar.iran.liara.run/public/boy?username=${username}`;
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;



export const currentUser = async () => {
    try {
        const response = await axios.get(`${apiUrl}/user/current`, {
            withCredentials: true,
        })
        return response.data
    } catch (error) {
        console.log("at fetchCurrentUser", error)
    }
}

export const allUser = async () => {
    try {
        const response = await axios.get(`${apiUrl}/user`, {
            withCredentials: true,
        })
        if(!response){
            console.log("something went wrong")
        }
        return response.data
    } catch (error) {
        console.log("at fetchUsers", error)
    }
}

export const userById = async (id:string|undefined) => {
    try {
        const response = await axios.get(`${apiUrl}/user/${id}`, {
            withCredentials: true,
        })
        return response.data
    } catch (error) {
        console.log("at fetchUsers", error)
    }
}

//authentication
export const signUp = async (form: { email: string, password: string, username: string }) => {
    try {
    
         await axios.post(`${apiUrl}/register`,form, {
                withCredentials: true,
        })
        console.log('successfully registered')
    } catch (error) {
        console.log("at signUp", error)
    }
}

export const logIn = async (form: { email: string, password: string }) => {
    try {
        console.log(form)
         const token = await axios.post(`${apiUrl}/login`,form, {
            //   headers: {
            //     "Content-Type": "application/json",
            // },
                withCredentials: true,
        })
        return token.data
    } catch (error) {
        console.log("at login", error)
    }
}


export const logOut = async () => {
    try {
      
         const response = await axios.post(`${apiUrl}/logout`,{},{
                withCredentials: true,
        })
          console.log(response.data)
    } catch (error) {
        console.log("at login", error)
    }
}


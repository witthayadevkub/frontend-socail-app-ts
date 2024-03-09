import axios from "axios";

//url
const apiUrl = import.meta.env.VITE_API_URL;

//type
import { AddPost } from "../interface/interface";


export const userAndPost = async () => {
    try {
        const response = await axios.get(`${apiUrl}/post`, {
            withCredentials: true,
        })
        return response.data
    } catch (error) {
        console.log("at fetchPosts", error)
    }
}

export const addPost = async (form:AddPost) => {
    try {      
        const response = await axios.post(`${apiUrl}/post`,form, {
            headers: {
            // "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        })
        return response.data
    } catch (error) {
        console.log("at addPosts", error)
    }
}

export const removePost = async (id:string):Promise<boolean> => {
    try {      
        const response = await axios.delete(`${apiUrl}/post/${id}`, {
            withCredentials: true,
        })
        if(response.status === 200){
            return true
        }
        return false
    } catch (error) {
        console.log("at removePosts", error)
        return false
    }
}
import axios from 'axios';

export async function postRequest(url, request){
    try{
        const response= await axios.post(url, request);
        return {
            isError: false,
            status: response.data.status,
            data: response.data.data,
            message: response.data.message
        }
    }catch(err){
        return {
            isError: true,
            status: err.response.data.status,
            data: err.response.data.data,
            message: err.response.data.message
        }
    }
}

export async function getRequest(url, identifier){
    try{
        const response= await axios.get(identifier?url+identifier:url);
        return {
            isError: false,
            status: response.data.status,
            data: response.data.data,
            message: response.data.message
        }
    }catch(err){
        return {
            isError: true,
            status: err.response.data.status,
            message: err.response.data.message
        }
    }
}

export async function deleteRequest(url, identifier){
    try{
        const response= await axios.delete(url+identifier);
        return {
            isError: false,
            status: response.data.status,
            data: response.data.data,
            message: response.data.message
        }
    }catch(err){
        return {
            isError: true,
            status: err.response.data.status,
            message: err.response.data.message
        }
    }
}
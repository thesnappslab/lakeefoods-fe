import axios from 'axios';

export async function postRequest(url, request){
    const response= await axios.post(url, request);
    if(response.data.success){
        return {
            isError: false,
            status: response.data.status,
            data: response.data.data,
            message: response.data.message
        }
    }else{
        return {
            isError: true,
            status: response.data.status,
            message: response.data.message
        }
    }
}

export async function getRequest(url, identifier){
    const response= await axios.get(identifier?url+identifier:url);
    if(response.data.success){
        return {
            isError: false,
            status: response.data.status,
            data: response.data.data,
            message: response.data.message
        }
    }else{
        return {
            isError: true,
            status: response.data.status,
            message: response.data.message
        }
    }
}

export async function deleteRequest(url, identifier){
    const response= await axios.delete(url+identifier);
    if(response.data.success){
        return {
            isError: false,
            status: response.data.status,
            data: response.data.data,
            message: response.data.message
        }
    }else{
        return {
            isError: true,
            status: response.data.status,
            message: response.data.message
        }
    }
}
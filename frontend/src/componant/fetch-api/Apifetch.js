// FetchTheMovieDB.js

import { getResponseContent, RequestError } from './Response'; // Assuming this file is in the same directory as services folder
import config from '../utils/ApiRoute';

async function makeRequest(endpoint, method, data, token,form) {
    const headers = {};
    // Check if data is present and determine the content type accordingly
    if(form){
        //  headers['Content-Type'] = `multipart/form-data; boundary=<calculated when request is sent>`;
    }else{
         headers['Content-Type'] = 'application/json';
    }
    if (token){
        headers.Authorization = `Bearer ${token?localStorage.getItem("TOKEN"):""}`;
    }
    const response = await fetch(`${config.APIBASE_URL}/${endpoint}`, {
        method,
        headers,
        body: data // Send JSON data directly in the body
    });

    const content = await getResponseContent(response);
    if (response.ok) return content;

    let errorMessage = '';
    if (content && content.message) {
        errorMessage = content.message;
    } else {
        errorMessage = response.statusText;
    }
    console.error('errorMessage:',errorMessage);
    throw new RequestError(errorMessage, response.status, content);
}

const FetchData = async (endpoint, method, data, token,form) => {
    try {
        return await makeRequest(endpoint, method, data, token,form);
    } catch (error) {
        console.log("error",error)
        throw error;
    }
};

export default FetchData;


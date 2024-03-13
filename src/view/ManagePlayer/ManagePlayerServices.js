import axios from "axios";
import { API_PATH } from "src/AppConfig"

const PATH = API_PATH;

export const getAllPlayer = () => {
    let url = PATH + '/getAllPlayer';
    return axios.get(url);
}

export const updatePlayer = (payload) => {
    let url = PATH + '/updatePlayer';
    return axios.post(url, payload);
}

export const deletePlayer = (id) => {
    let url = PATH + '/deletePlayer/' + id;
    return axios.delete(url);
}

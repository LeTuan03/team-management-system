import axios from "axios";
import { API_PATH } from "src/AppConfig"

const PATH = API_PATH;

export const getAllTeam = () => {
    let url = PATH + '/getAllTeam';
    return axios.get(url);
}

export const updateTeam = (payload) => {
    let url = PATH + '/updateTeam';
    return axios.post(url, payload);
}

export const deleteTeam = (id) => {
    let url = PATH + '/deleteTeam/' + id;
    return axios.delete(url);
}

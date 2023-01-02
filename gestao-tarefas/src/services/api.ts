import axios, {AxiosInstance} from "axios";

const api: AxiosInstance = axios.create({
    baseURL: 'https://backend-gestao-de-tarefas.onrender.com/',
  });

export default api
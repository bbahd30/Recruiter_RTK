import axios from "axios";

const BackendClient = axios.create({
    baseURL: "http://localhost:8000/",
    withCredentials: true,
    // headers: {
    //   "Access-Control-Allow-Headers":
    //     "Access-Control-Allow-Headers,Accept,Origin, X-Requested-With, Content-Type",
    //   "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    // },
});

export default BackendClient;

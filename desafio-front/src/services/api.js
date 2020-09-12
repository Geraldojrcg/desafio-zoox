import axios from 'axios';
import NProgress from 'nprogress';

const api = axios.create({
    baseURL: "http://localhost:3000/"
});

let template = `
'<div class="bar" style='background-color: #F28705; height: 3px' role="bar">
`;

NProgress.configure({
    template: template
});

api.interceptors.request.use(config => {
    NProgress.start();
    config.headers = {
        "x-api-key": "ca03na188ame03u1d78620de67282882a84",
    };
    return config;
}, () => {
    NProgress.done()
})

api.interceptors.response.use(
    response => {
        NProgress.done()
        return response.data;
    }, error => {
        NProgress.done();
        console.log(error);
        return Promise.reject(error.response.data);
    }
);

export default api;
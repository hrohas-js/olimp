import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://95-163-243-224.cloudvps.regruhosting.ru/api'
});

export const kladr = axios.create({
    baseURL: 'http://kladr-api.ru',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST',
        'Access-Control-Allow-Headers': 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With'
    }
});

export const map = axios.create({
    baseURL: 'https://geocode-maps.yandex.ru/1.x'
});

export const coords = axios.create({
    baseURL: 'http://ip-api.com'
});

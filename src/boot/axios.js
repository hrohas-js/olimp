import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api.productioncity.pro/api'
});

export const kladr = axios.create({
    baseURL: 'https://kladr-api.ru',
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

import axios from 'axios';

export function getStatisticsfForOne() {
    return (axios.get('http://ec2-18-184-116-86.eu-central-1.compute.amazonaws.com:3001/api/purchases/getDomesticRatio/9001'))
}



export const getStatisticsfForAll = axios.get('/all')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });

export function getProducts() {
    return (axios.get('http://ec2-18-184-116-86.eu-central-1.compute.amazonaws.com:3001/api/purchases/getDomesticRatio/9001'))
}
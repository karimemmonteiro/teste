import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const APILOCAL = process.env.APILOCAL || "https://localhost:7179/";
const APINEXT = process.env.APINEXT || "http://localhost:3000/api/"

const apiPss = axios.create({
  baseURL: APILOCAL,
});

const apiNext = axios.create({
  baseURL: APINEXT,
});


export{ apiPss, apiNext}
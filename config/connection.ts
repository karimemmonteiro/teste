import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const APILOCAL = process.env.APILOCAL || "https://localhost:7179/";

const apiPss = axios.create({
    baseURL: APILOCAL,
  });

export default apiPss
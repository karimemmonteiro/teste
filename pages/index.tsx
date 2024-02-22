import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import SplashScreen from "../components/SplashScreen";
import { JwtPayload, jwtDecode } from "jwt-decode";

const IndexPage = () => {
  dayjs.locale('pt-br');

  const [loading, setLoading] = useState(true)
  const router = useRouter();
  return (
    <div>
      <Layout title="Sebrae | Atendimento Externo" />
    </div>
  )
}

export default IndexPage;

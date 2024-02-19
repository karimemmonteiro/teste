import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import SplashScreen from "../components/SplashScreen";
import { JwtPayload, jwtDecode } from "jwt-decode";

const IndexPage = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  return (
    <div>
          <Layout title="Sebrae | Atendimento Externo" />
    </div>
  )
}

export default IndexPage;

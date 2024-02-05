import { useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

const IndexPage = () => {
  const dadosLogin = useSelector((state: any) => state.dadosLogin);
  const storedStep = useSelector((state: any) => state.step);
  const router = useRouter();

  useEffect(() => {
    console.log("teste dados de login=========", dadosLogin);
    const isAuthenticated = true;

    if (!isAuthenticated) {
      router.push('/');
    }
  }, []);

  return (
    <Layout title="Sebrae | Atendimento Externo" />
  );
};

export default IndexPage;

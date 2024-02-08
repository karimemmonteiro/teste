import { useEffect } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { createStore } from "redux";
import { rootReducer } from "../Redux/stores";
import { Provider } from "react-redux";

const IndexPage = () => {
  const router = useRouter();

  const store = createStore(rootReducer);

  // useEffect(() => {
  //   const isAuthenticated = true;

  //   if (!isAuthenticated) {
  //     router.push('/');
  //   }
  // }, []);

  return (
      <Layout title="Sebrae | Atendimento Externo" />
  );
};

export default IndexPage;

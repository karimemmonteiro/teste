import { message } from "antd";
import { apiNext } from "../../../config/connection";
import { useOnline } from "../contants/onlineOffline";
type FieldType = {
    cpf: string;
    password?: string;
};


async function Login(params: FieldType) {
    const online = useOnline();
    function removeNonNumericChars(cpf) {
        return cpf.replace(/\D/g, '');
    }
    const cpfWithoutMask = removeNonNumericChars(params.cpf);
    if (online) {
        try {
            const response = await apiNext.post("/users/create", {
                cpf: cpfWithoutMask,
                senha: params.password,
                idSistema: 4,
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW5kcsOpIFVjaMO0YSBNZXNxdWl0YSIsInJvbGUiOiJSZXByZXNlbnRhbnRlIiwibmFtZWlkIjoiMDIxOTU2NzkyMTIiLCJuYmYiOjE2OTg0Mjc0NDcsImV4cCI6MTg1NjI4MDI0NywiaWF0IjoxNjk4NDI3NDQ3fQ.4YTgWe6I_t0dyv86SFLCIS80wgCZeKF4r0UItVla84s"
            }
            );
            const responseData = response.data;
            console.log("test login", responseData)
            if (responseData.status === 200) {
                localStorage.setItem('userToken', responseData.user.token);
                localStorage.setItem('userCpf', cpfWithoutMask);
                window.location.href = "/atendimento";
                if (cpfWithoutMask === "01424657202") {
                    window.location.href = "/atendimento";
                }
            } else {
                console.log("error")
            }

        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
        }
    } else {
        try {
            const response = await apiNext.get(`/users/${cpfWithoutMask}?senha=${params.password}`
            );
            const responseData = response.data;
            console.log("test login", responseData)
            if (responseData.status === 200) {
                localStorage.setItem('userToken', responseData.user.token);
                localStorage.setItem('userCpf', cpfWithoutMask);
                window.location.href = "/atendimento";
                if (cpfWithoutMask === "01424657202") {
                    window.location.href = "/atendimento";
                }
            } else {
                console.log("error")
            }

        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
        }
    }




}

export default Login
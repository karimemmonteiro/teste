import { MenuFoldOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
export default function Sidebar(){
    const [user, setUser] = useState("")
    const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') : null;
    useEffect(()=>{
        if(userName !== null){
            setUser(userName)
        }else{
            setUser("")
        }
    },[])
    return(
        <div className="flex w-full bg-azulSebrae text-white justify-between p-2 items-center">
            <img src="./sebrae.png" alt="logoSebrae"/>
            <h1 className="text-2xl"> Sistema de Atendimento</h1>
            <h1 className="text-lg"><UserOutlined /> {user}</h1>
        </div>
    )
}
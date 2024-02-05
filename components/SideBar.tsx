import { MenuFoldOutlined } from "@ant-design/icons";
export default function Sidebar(){
    return(
        <div className="flex w-full bg-azulSebrae text-white justify-between p-2 items-center">
            <img src="./sebrae.png" alt="logoSebrae"/>
            <h1 className="text-2xl"> Sistema de Atendimento</h1>
            <h1 className="text-2xl"><MenuFoldOutlined /></h1>
        </div>
    )
}
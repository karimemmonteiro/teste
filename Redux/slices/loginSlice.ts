import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [
    {
        cpf: "",
        senha: "",
        token: "",
        refreshToken: "",
        idSistema: null,
        statusResponse: null,
        textResponse: "",
        id: null
    }
];
const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers:{
        addLogin:(state, action: PayloadAction<any>) =>{
            const {id, cpf, token, senha, refreshToken, idSistema, statusResponse, textResponse} = action.payload;
            state.push({id, cpf, token, senha, refreshToken, idSistema, statusResponse, textResponse})
        },
        deleteLogin:(state, action: PayloadAction<any>)=>{
            const loginId = action.payload;
            return state.filter((login:any) => login.id === loginId);
        },
        editLogin: (state, action: PayloadAction<any>) => {
            const { id } = action.payload;
            const loginIndex = state.findIndex((login) => login.id === id);
            if (loginIndex !== -1) {
              state[loginIndex] = action.payload;
            }
          },
    }
})

export const {addLogin, deleteLogin, editLogin} = loginSlice.actions;
export default loginSlice.reducer;
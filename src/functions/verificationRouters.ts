import { AppRouter } from "../constant/Router"


export function verficicationRouters (asPath: string){
    const appPublicRoutes = Object.values(AppRouter.public)
    return appPublicRoutes.includes(asPath)
}
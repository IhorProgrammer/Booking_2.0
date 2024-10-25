import { LinkInfo } from "./Classes/ILinkInfo/LinkInfo";


const paths: LinkInfo = new LinkInfo(
    "Головна", 
    "", 
    undefined, 
    [
        new LinkInfo(
            "Client_API",
            "client",
            undefined,
            [
                new LinkInfo(
                    "Авторизація",
                    "client-authorization",
                    import("./Settings/ClientMethods/UserAuthorization/UserAuthorization"),
                ),
                new LinkInfo(
                    "Реєстрація",
                    "client-registration",
                    import("./Settings/ClientMethods/UserRegistration/UserRegistration"),
                ),
                new LinkInfo(
                    "Зміна даних",
                    "client-change",
                    import("./Settings/ClientMethods/ChangeUserData/ChangeUserData"),
                ),
                new LinkInfo(
                    "Аватарка",
                    "client-image",
                    import("./Settings/ClientMethods/GetImage/GetImage"),
                )
            ]
        ),
        new LinkInfo(
            "Token_API",
            "token",
            undefined,
            [
                new LinkInfo(
                    "S_Отримання salt",
                    "token-get-salt",
                    import("./Settings/TokenMethods/GET_ReceivingSaltTokens/GET_ReceivingSaltTokens"),     
                    undefined,
                    true               
                ),
                new LinkInfo(
                    "Генерація токенів",
                    "token-create",
                    import("./Settings/TokenMethods/POST_CreateToken/POST_CreateToken"),                    
                ),
                new LinkInfo(
                    "S_Підписка користувача",
                    "token-sub-user",
                    import("./Settings/TokenMethods/PUT_UserSubscription/PUT_UserSubscription"),    
                    undefined,
                    true                 
                ),
                new LinkInfo(
                    "S_Дешифрування",
                    "token-decryption",
                    import("./Settings/TokenMethods/GET_DecipheringInfo/GET_DecipheringInfo"),     
                    undefined,
                    true                
                ),
                new LinkInfo(
                    "Отримання сесій",
                    "token-get-session",
                    import("./Settings/TokenMethods/GET_GetSession/GET_GetSession"),                    
                ),
                new LinkInfo(
                    "Видалення сесій",
                    "token-delete-session",
                    import("./Settings/TokenMethods/DELETE_DeleteSession/DELETE_DeleteSession"),                    
                ),
                new LinkInfo(
                    "Google Auth",
                    "token-get-google",
                    import("./Settings/TokenMethods/GET_GoogleAuthorization/GET_GoogleAuthorization"),                    
                ),
                new LinkInfo(
                    "S_Google Auth",
                    "token-get-google-s",
                    import("./Settings/TokenMethods/GET_GoogleAuthorizationServer/GET_GoogleAuthorizationServer"),  
                    undefined,
                    true                   
                ),
            ]
        ),
        new LinkInfo(
            "Residence_API",
            "residence",
            undefined,
            [
                new LinkInfo(
                    "Categories",
                    "residence-categories",
                    import("./Settings/ResidenceMethods/GET_GetCategories"),  
                ),
                new LinkInfo(
                    "Search",
                    "residence-search",
                    import("./Settings/ResidenceMethods/GET_Search"),  
                ),
                new LinkInfo(
                    "Info",
                    "residence-info",
                    import("./Settings/ResidenceMethods/GET_HotelInfo"),  
                )
            ]
        )
    ]
);

export default paths;
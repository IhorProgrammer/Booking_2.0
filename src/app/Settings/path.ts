
const path = {
    "client": {
        "": import("./ClientMethods/UserAuthorization/UserAuthorization"),
        "authorization": import("./ClientMethods/UserAuthorization/UserAuthorization"),
        "registration": import("./ClientMethods/UserRegistration/UserRegistration")
    }
};

export default path;
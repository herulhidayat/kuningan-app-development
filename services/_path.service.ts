export const API_PATH = () => {
    return {
      auth: {
        login: "v1/public/auth/login",
        refresh: "v1/public/auth/refresh",
      },
      dataset: {
        add: "v1/dataSet/add",
        update: "v1/dataSet/update",
        delete: "v1/dataSet/delete",
        getAll: "v1/dataSet/get-all",
        getOne: "v1/dataSet/get-one",
      },
      user: {
        getAll: "v1/user/get-all",
        getOne: "v1/user/get-one",
        add: "v1/user/add",
        update: "v1/user/update",
        delete: "v1/user/delete",
      },
    }
}
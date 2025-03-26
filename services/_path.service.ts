export const API_PATH = () => {
    return {
      auth: {
        login: "api/v1/public/auth/login",
        refresh: "api/v1/public/auth/refresh",
      },
      dataset: {
        add: "api/v1/dataSet/add",
        update: "api/v1/dataSet/update",
        delete: "api/v1/dataSet/delete",
        getAll: "api/v1/dataSet/get-all",
        getOne: "api/v1/dataSet/get-one",
      }
    }
}
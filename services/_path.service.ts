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
      role: {
        getAll: "v1/role/get-all",
        getOne: "v1/role/get-one",
        add: "v1/role/add",
        update: "v1/role/update",
        delete: "v1/role/delete",
      },
      catalog: {
        getAll: "v1/catalog/get-all",
        getOne: "v1/catalog/get-one",
        add: "v1/catalog/add",
        update: "v1/catalog/update",
        delete: "v1/catalog/delete",
        getAllSource: "v1/catalog/get-all-source",
      },
      blog: {
        getAll: "v1/blog/get-all",
        getOne: "v1/blog/get-one",
        add: "v1/blog/add",
        update: "v1/blog/update",
        delete: "v1/blog/delete",
      },
      cdn: {
        uploadImage: "v1/cdn/upload-image",
        deleteImage: "v1/cdn/delete-image",
      }
    }
}
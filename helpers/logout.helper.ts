import { deleteItem } from "./localstorage.helper";
import Cookies from "js-cookie";

export default function logout() {
    deleteItem("token");
    deleteItem("user");
    Cookies.remove("authToken");
    window.location.href = "/login";
}
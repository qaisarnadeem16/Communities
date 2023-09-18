import axios from "axios"
import { server } from "../../server"


export const loadAdmin = () => async (dispatch, state) => {
    const token = localStorage.getItem("token")
    try {
        dispatch({
            type: "LoadAdminRequest",
        })
        const { data } = await axios.get(`${server}/admin/getAdmin`, {
            headers: {
                Authorization: token
            }
        })
        dispatch({
            type: "LoadAdminSuccess",
            payload: data.admin
        })
    } catch (error) {
        dispatch({
            type: "LoadAdminFail",
            payload: error.response.data.message,
        })
    }

}
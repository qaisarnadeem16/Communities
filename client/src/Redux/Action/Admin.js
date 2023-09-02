import axios from "axios"
import { server } from "../../server"


export const loadAdmin = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadAdminRequest",
        })
        const { data } = await axios.get(`${server}/admin/getAdmin`, { withCredentials: true })
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
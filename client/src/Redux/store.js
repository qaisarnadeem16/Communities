import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './Reducer/user'
import { adminReducer } from './Reducer/Admin'
import LoanPlanSlice from './ReduxSlices/LoanPlanSlice'
import LoanTypeSlice from './ReduxSlices/LoanTypeSlice'
import Loans from './ReduxSlices/Loans'



const Store= configureStore({
    reducer:{
        user: userReducer,
        admin: adminReducer,
        loanPlans:LoanPlanSlice,
        loanTypes: LoanTypeSlice,
        loans:Loans
    }
})

export default Store
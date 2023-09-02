import React from 'react';
import DashBoard from './DashBoard';

import AddPlanForm from '../../components/Products/AddPlanForm';
import PlanTable from '../../components/Products/PlanTable';
import AddLoanType from '../../components/Products/AddLoanType';
import TypeTable from '../../components/Products/TypeTable';

const Products = () => {




    return (
        <DashBoard>
            <div className="w-full ">

                <div className="flex md:px-12 px-5 md:gap-16 gap-5 z-30">
                    <div className="text-2xl block font-medium capitalize   ">Products</div>

                </div>

                <div className="md:px-10 px-2 py-4">



                    <h1 className="text-black text-xl font-semibold py-4">Add New Plan</h1>

                    <div className="w-full flex md:gap-8 gap-5 flex-wrap" >
                        <div className="md:w-[30%] w-full ">
                            <AddPlanForm />
                        </div>

                        <div className="md:w-[65%] w-full ">
                            <PlanTable />
                        </div>
                    </div>
                </div>

                {/* //Second Part */}
                <div className="md:px-10 px-2 ">



                    <h1 className="text-black text-xl font-semibold py-5">Add Loan Type</h1>

                    <div className="w-full flex md:gap-10 gap-5 flex-wrap" >
                        <div className="md:w-[30%] w-full ">
                            <AddLoanType />
                        </div>

                        <div className="md:w-[65%] w-full ">
                            <TypeTable />
                        </div>
                    </div>
                </div>


            </div>
        </DashBoard>
    );
};

export default Products;

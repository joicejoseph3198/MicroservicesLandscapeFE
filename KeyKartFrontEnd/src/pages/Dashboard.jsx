export const Dashboard = () => {
    // Todo: Convert input to a atomic component
    return(
        <div className="flex h-screen text-stone-600">
            <div className="flex-auto p-5 w-1/12 bg-gray-50 border-r-2 border-slate-300 ">
                <h1>Sidebar</h1>
            </div>
            <div className="flex-auto w-9/12 p-10">
                {/*BEGIN Page Navigation*/}
                <p className="text-lg text-left text-gray">Back to product list</p>
                <h2 className="text-2xl text-left text-slate-700">Add New Product</h2>
                {/*END Page Navigation*/}
                <div className="flex">
                    <div className="flex-auto pt-5 w-4/12">
                        {/*BEGIN Description Section*/}
                        <div className="text-left px-2 pb-10">
                            <h2 className="text-2xl text-slate-700 pb-2"> Description </h2>
                            <div className="p-5 border-2 rounded-md text-lg">
                                <div className="pb-2">
                                    <h3>Product Name</h3>
                                    <input type="text" placeholder="Enter product name" 
                                        className="bg-transparent text-black w-full focus:outline-blue px-6 py-2 text-sm lg:text-xl font-semibold border-2 rounded-md" 
                                    />
                                </div>
                                <div className="py-2">
                                    <h3>Product Description</h3>
                                    <textarea  placeholder="Enter product description" 
                                        className="resize-none bg-transparent text-black w-full h-60 focus:outline-blue px-6 py-2 text-sm lg:text-lg font-semibold border-2 rounded-md" 
                                    />
                                </div>
                            </div>
                        </div>
                        {/*END Description Section*/}
                         {/*BEGIN Category Section*/}
                         <div className="text-left px-2 pb-5">
                            <h2 className="text-2xl text-slate-700 pb-2"> Category </h2>
                            <div className="p-5 border-2 rounded-md text-lg">
                                <div className="pb-2">
                                    <h3>Brand Name</h3>
                                    <input type="text" placeholder="Enter brand name" 
                                        className="bg-transparent text-black w-full focus:outline-blue px-6 py-2 text-sm lg:text-xl font-semibold border-2 rounded-md" 
                                    />
                                </div>
                                <div className="py-2">
                                    <h3>Model Number</h3>
                                    <input type="text" placeholder="Enter model number" 
                                        className="bg-transparent text-black w-full focus:outline-blue px-6 py-2 text-sm lg:text-xl font-semibold border-2 rounded-md" 
                                    />
                                </div>
                                <div className="flex flex-row gap-2">
                                    <div className="flex-auto w-1/3 py-2">
                                        <h3>Switches</h3>
                                        <input type="text" placeholder="" 
                                            className="bg-transparent text-black w-full focus:outline-blue px-6 py-2 text-sm lg:text-xl font-semibold border-2 rounded-md" 
                                        />
                                    </div>
                                    <div className="flex-auto w-1/3 py-2">
                                        <h3>Keycaps</h3>
                                        <input type="text" placeholder="" 
                                            className="bg-transparent text-black w-full focus:outline-blue px-6 py-2 text-sm lg:text-xl font-semibold border-2 rounded-md" 
                                        />
                                    </div>
                                    <div className="flex-auto w-1/3 py-2">
                                        <h3>Layout</h3>
                                        <input type="text" placeholder="" 
                                            className="bg-transparent text-black w-full focus:outline-blue px-6 py-2 text-sm lg:text-xl font-semibold border-2 rounded-md" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*END Category Section*/}
                    </div>
                    <div className="flex-auto w-4/12 pl-5">
                        {/*BEGIN Inventory Details Section*/}
                        <div className="text-left px-2 pb-10">
                            <h2 className="text-2xl text-slate-700 pb-2"> Inventory And Shipping </h2>
                            <div className="p-5 border-2 rounded-md text-lg">
                                <div className="pb-2">
                                    <h3>SKU Code (Optional)</h3>
                                    <input type="text" placeholder="Enter SKU code " 
                                        className="bg-transparent text-black w-full focus:outline-blue px-6 py-2 text-sm lg:text-xl font-semibold border-2 rounded-md" 
                                    />
                                </div>
                                <h3 className="flex-auto py-2">Package Size (used to ship product)</h3>
                                <div className="flex flex-row gap-2">
                                    <div className="flex-auto w-1/3 py-2">
                                        <h3>Length</h3>
                                        <input type="text" placeholder="in" 
                                            className="bg-transparent text-black w-full focus:outline-blue px-6 py-2 text-sm lg:text-xl font-semibold border-2 rounded-md" 
                                        />
                                    </div>
                                    <div className="flex-auto w-1/3 py-2">
                                        <h3>Breadth</h3>
                                        <input type="text" placeholder="in" 
                                            className="bg-transparent text-black w-full focus:outline-blue px-6 py-2 text-sm lg:text-xl font-semibold border-2 rounded-md" 
                                        />
                                    </div>
                                    <div className="flex-auto w-1/3 py-2">
                                        <h3>Height</h3>
                                        <input type="text" placeholder="in" 
                                            className="bg-transparent text-black w-full focus:outline-blue px-6 py-2 text-sm lg:text-xl font-semibold border-2 rounded-md" 
                                        />
                                    </div>
                                </div>
                                <div className="pb-2">
                                    <h3>Items Weight</h3>
                                    <input type="text" placeholder="Kg" 
                                        className="bg-transparent text-black w-full focus:outline-blue px-6 py-2 text-sm lg:text-xl font-semibold border-2 rounded-md" 
                                    />
                                </div>
                            </div>
                        </div>
                        {/*END Inventory Details Section*/}
                    </div>
                </div>
            </div>
           
        </div>
         
    
    )
}

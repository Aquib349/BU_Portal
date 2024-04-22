function Modal({ toggleModal }) {
    return (
        <>
            <div className="modal_component">
                <div className={`modal inset-0 z-50 items-center justify-center fixed h-[100vh] bg-black/40`}>
                    <div className="modal-content relative rounded-xl bg-slate-100 drop-shadow-xl max-w-xl w-11/12 animation-zoomIn">
                        <div className="modal-header px-2 py-3 border-b border-slate-400">
                            <div className="close text-3xl absolute right-6 font-bold leading-8 cursor-pointer
               text-slate-500 hover:text-slate-700" onClick={toggleModal}>
                                ×
                            </div>
                            <h2 className="text-md font-semibold px-2 text-gray-800">
                                Edit User
                            </h2>
                        </div>
                        <span className="text-red-500 text-[0.7rem] px-5">All the ( * ) are compulsory</span>
                        <form className="modal-body px-4 pb-3 text-black flex flex-col gap-3">
                            <div className="hospital_name">
                                <label className="text-[0.8rem] px-1 font-semibold ">Hopital Name</label>
                                <input
                                    className="border border-slate-400 w-full p-2 rounded-md bg-transparent text-[0.9rem] text-medium outline-none" readOnly />
                            </div>

                            <div className="user_name">
                                <label className="text-[0.8rem] px-1 font-semibold ">User Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    name="username"
                                    className="border border-slate-400 w-full p-2 rounded-md bg-transparent text-[0.9rem] text-medium" />
                            </div>

                            <div className="hospital_name">
                                <label className="text-[0.8rem] px-1 font-semibold ">Start Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    name="start_date"
                                    className="border border-slate-400 w-full p-2 rounded-md bg-transparent text-[0.9rem] text-medium" />
                            </div>
                            <div className="hospital_name">
                                <label className="text-[0.8rem] px-1 font-semibold ">End Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    name="end_date"
                                    className="border border-slate-400 w-full p-2 rounded-md bg-transparent text-[0.9rem] text-medium" />
                            </div>
                        </form>
                        <div className="px-6 text-right rounded-b-xl py-3">
                            <button className="bg-[#804af3] px-8 py-2 text-sm rounded-md font-semibold text-white">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
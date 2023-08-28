const Modal = ({children, modalOpen, setModalOpen} : {children: React.ReactNode, modalOpen: boolean, setModalOpen: (modalOpen: boolean)=>void}) => {
  return (
    <>
      {modalOpen && <div className="bg-black/50 fixed inset-0 z-50"><div className="flex justify-center items-center h-full"><div className="flex flex-col items-end bg-gradient-to-r from-[#CCD411] to-white w-1/2 p-5 rounded-lg md:w-1/3"><button className="text-2xl mb-3 hover:scale-110" onClick={()=>setModalOpen(false)}>&times;</button>{children}</div></div></div>}
    </>
  )
}

export default Modal
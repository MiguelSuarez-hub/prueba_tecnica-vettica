"use client";

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Card from "@/components/Card";
import Modal from "@/components/Modal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [tocken, setTocken] = useState("");
  const [autoriced, setAutoriced] = useState(false);

  const seriales = [
    "1010000008551426",
    "1010000008553091",
    "1010000008553067",
    "1010000008550436",
    "1010000008582546",
  ];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/login", { user_name, password })
      .then((res) => {
        console.log(res);
        const accessToken = res.data.access_token;
        setTocken(accessToken);
        setAutoriced(true);
        toast.success('Autorización correcta', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
      .catch((err) => {
        console.log(err);
        toast.warn('Autorización incorrecta', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
      .finally(() => {
        setModalOpen(false);
        setUser_name("");
        setPassword("");
      });
  };

  return (
    <main className="py-3 px-10 w-full selection:text-gray-600 selection:bg-white">
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className=" text-5xl text-white font-bold">
            Prueba tecnica Vettica
          </h1>
          <p className="text-xl text-white">
            Consulta la información de tu tarjeta tullave!
          </p>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {autoriced ? (
          <div
            className="border-2 py-1 px-3 rounded-lg border-white text-white bg-[#01447B] text-xl"
          >
            Autorizado
          </div>
        ) : (
          <button
            onClick={() => setModalOpen(true)}
            className="border-2 py-1 px-3 rounded-lg border-white text-white bg-[#01447B] text-xl hover:scale-105"
          >
            Autorización
          </button>
        )}
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form
            onSubmit={onSubmit}
            className="p-2 w-full flex flex-col gap-2 justify-center items-center"
          >
            <h2>Ingrese el usuario para la autenticación JWT</h2>
            <input
              type="text"
              name="user"
              placeholder="Ingrese el usuario"
              onChange={(e) => {
                setUser_name(e.target.value);
              }}
              className="p-1 w-full rounded-sm text-sm md:text-md text-slate-600"
              value={user_name}
              required
            ></input>
            <input
              type="password"
              name="password"
              placeholder="Ingrese la contraseña"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="p-1 w-full rounded-sm text-sm md:text-md text-slate-600"
              value={password}
              required
            ></input>
            <button
              type="submit"
              className=" w-1/2 px-1 md:px-5 py-1 bg-[#CCD411] text-white rounded-2xl hover:scale-110 hover:bg-[#01447B]"
            >
              Consultar
            </button>
          </form>
        </Modal>
        
      </div>
      <section className="flex flex-col md:grid md:grid-cols-3 gap-5 mt-4">
        {seriales.map((serial) => (
          <Card key={serial} serial={serial} tocken={tocken} auto={autoriced} />
        ))}
      </section>
    </main>
  );
}

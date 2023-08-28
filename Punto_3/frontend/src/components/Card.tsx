"use client";

import { useState } from "react";
import axios from "axios";

import Modal from "./Modal";

const Card = ({ serial, tocken, auto }: { serial: string, tocken: string, auto: boolean }) => {
  const [isConsulted, setIsConsulted] = useState(false);
  const [userInfo, setUserInfo] = useState({ userName: "", userLastName: "" });
  const [userBalance, setUserBalance] = useState(0);

  const handleConsult = () => {
    axios
      .get(`http://localhost:8000/${serial}`, {headers: {Authorization: `Bearer ${tocken}`}})
      .then((res) => {
        console.log(res);
        const data = res.data;
        const info = data.content;
        const balance = data.balance.balance;
        const consultTime = data.headers.Date;
        const endpoint = data.request.url;
        const payload = JSON.stringify(res);
        const headers = JSON.stringify(res.headers);
        const userId = "test";
        const method = data.request.method;
        const elapsedTime = data.timeElapsed;
        const statusCodeMs = res.status;
        const statusCodeApi1 = data.status_code;
        const statusCodeApi2 = data.status_code_balance;
        setUserInfo(info);
        setUserBalance(balance);
        axios
          .post("/api/consults", {
            consultTime,
            endpoint,
            payload,
            headers,
            userId,
            method,
            elapsedTime,
            statusCodeMs,
            statusCodeApi1,
            statusCodeApi2,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {});
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsConsulted(true);
      });
  };

  return (
    <div className=" h-60 p-6 flex flex-col items-center justify-between rounded-lg border-2 bg-gradient-to-r from-[#CCD411] via-[#CCD411] to-white">
      {isConsulted ? (
        <>
          <div className="flex flex-col w-full">
            <p>Nombre: {userInfo.userName}</p>{" "}
            <p> Apellido: {userInfo.userLastName}</p>
          </div>
          <img
            src="https://www.recargatullaveenlinea.co/img/logo-tullave.png"
            alt="logo tullave"
          />
          <div className="flex justify-between items-center w-full">
            <p>Balance: $ {userBalance}</p>
            <p>****{serial.slice(-4)}</p>
          </div>
        </>
      ) : (
        <>
          <p>Tarjeta con serial terminado en: {serial.slice(-4)}</p>
          <img
            src="https://www.recargatullaveenlinea.co/img/logo-tullave.png"
            alt="logo tullave"
          />
          <button
            onClick={handleConsult}
            disabled={!auto}
            className={`border-2 py-1 px-3 rounded-lg border-white text-white bg-[#01447B] text-xl  ${!auto ? "cursor-none" : "cursor-pointer hover:scale-105"}`}
          >
            Consultar
          </button>
        </>
      )}
    </div>
  );
};

export default Card;

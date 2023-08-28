import { NextResponse } from "next/server";

import prisma from '@/lib/prismadb';

export const POST = async (request) => {
  try {
    const body = await request.json();

    const newConsult = await prisma.Consult.create({
      data: body
    });
    return NextResponse.json(newConsult)
  } catch (error) {
    return NextResponse.json({message: 'POST error', error}, {status: 500})
  }
}
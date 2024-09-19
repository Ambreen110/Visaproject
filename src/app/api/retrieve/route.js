// src/app/api/visas/route.js

import { NextResponse } from 'next/server';
import clientPromise from '../../../utils/db'; // Adjust path as necessary
import Visa from '../../../models/visa'; // Adjust path as necessary

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // Access your database here

    const visas = await Visa.find(); // Retrieve all visas from the database

    return NextResponse.json(visas);
  } catch (error) {
    console.error('Failed to retrieve visas', error);
    return NextResponse.json({ message: 'Failed to retrieve visas' }, { status: 500 });
  }
}

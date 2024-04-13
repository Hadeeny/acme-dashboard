// import { db } from '@/app/lib/db';
import { Status } from '@prisma/client';
import { customers, invoices, revenue } from '@/app/lib/dummy';

import { PrismaClient } from '@prisma/client';
// caching our db instantiation
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

// https://nextjs.org/learn/dashboard-app/fetching-data

async function seedInvoices() {
  try {
    await db.invoice.createMany({
      data: invoices,
    });

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers() {
  try {
    await db.customer.createMany({
      data: customers,
    });
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedRevenue() {
  try {
    await db.revenue.createMany({
      data: revenue,
    });
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  await seedCustomers();
  await seedInvoices();
  await seedRevenue();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});

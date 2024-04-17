'use server';

import { z } from 'zod';
import { db } from './db';
import { Status } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { amount, customerId, status } = CreateInvoice.parse({
    amount: formData.get('amount'),
    customerId: formData.get('customerId'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;

  const date = new Date().toISOString().split('T')[0];
  try {
    await db.invoice.createMany({
      data: {
        amount: amountInCents,
        createdAt: date,
        status: status,
        customerId,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// ...

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await db.invoice.update({
      data: {
        status,
        amount: amountInCents,
        customerId,
      },
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  //   throw new Error('Failed to Delete Invoice');
  try {
    await db.invoice.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    return {
      message: 'Delete error, unable to delete',
    };
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

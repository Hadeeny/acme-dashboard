import { db } from '../app/lib/db';
import { customers, invoices, revenue } from '../app/lib/dummy';

async function main() {
  await db.customer.createMany({
    data: customers,
  });
  await db.revenue.createMany({
    data: revenue,
  });
  await db.invoice.createMany({
    data: invoices,
  });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });

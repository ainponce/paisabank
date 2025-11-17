import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedData = async (): Promise<void> => {
  await prisma.transaction.deleteMany({});
  await prisma.card.deleteMany({});
  await prisma.user.deleteMany({});

  const user = await prisma.user.create({
    data: {
      email: "soypaisanx@paisanos.io",
      password: "PAISANX2023!$",
      name: "Paisanx",
      token: "paisanx-token-2023",
    },
  });

  await prisma.card.createMany({
    data: [
      {
        userId: user.id,
        issuer: "Visa",
        name: "Soy Paisanx",
        expDate: "02/30",
        lastDigits: "1234",
        fullNumber: "4532 1488 0343 1234",
        cvv: "123",
        balance: "978.85",
        currency: "USD",
      },
      {
        userId: user.id,
        issuer: "Mastercard",
        name: "Paisanx Premium",
        expDate: "05/29",
        lastDigits: "5678",
        fullNumber: "5425 2334 3010 5678",
        cvv: "456",
        balance: "1523.40",
        currency: "USD",
      },
    ],
  });

  const transactions = [
    {
      userId: user.id,
      title: "Adobe",
      amount: "125",
      transactionType: "SUS",
      date: new Date("2025-11-14"),
    },
    {
      userId: user.id,
      title: "Spotify",
      amount: "15",
      transactionType: "SUS",
      date: new Date("2025-11-13"),
    },
    {
      userId: user.id,
      title: "Netflix",
      amount: "20",
      transactionType: "SUS",
      date: new Date("2025-11-12"),
    },
    {
      userId: user.id,
      title: "Figma",
      amount: "125",
      transactionType: "SUS",
      date: new Date("2025-11-11"),
    },
    {
      userId: user.id,
      title: "Camila Montenegro",
      amount: "95",
      transactionType: "CASH_IN",
      date: new Date("2025-11-10"),
    },
    {
      userId: user.id,
      title: "Juan David",
      amount: "95",
      transactionType: "CASH_IN",
      date: new Date("2025-11-09"),
    },
    {
      userId: user.id,
      title: "Maria Rodriguez",
      amount: "150",
      transactionType: "CASH_IN",
      date: new Date("2025-11-08"),
    },
    {
      userId: user.id,
      title: "Leonardo Echazu",
      amount: "95",
      transactionType: "CASH_OUT",
      date: new Date("2025-11-07"),
    },
    {
      userId: user.id,
      title: "Jorge Cruz",
      amount: "95",
      transactionType: "CASH_OUT",
      date: new Date("2025-11-06"),
    },
    {
      userId: user.id,
      title: "Martin Bozini",
      amount: "95",
      transactionType: "CASH_IN",
      date: new Date("2025-11-05"),
    },
    {
      userId: user.id,
      title: "GitHub",
      amount: "45",
      transactionType: "SUS",
      date: new Date("2025-11-04"),
    },
    {
      userId: user.id,
      title: "Ana Martinez",
      amount: "200",
      transactionType: "CASH_IN",
      date: new Date("2025-11-03"),
    },
    {
      userId: user.id,
      title: "Carlos Vega",
      amount: "80",
      transactionType: "CASH_OUT",
      date: new Date("2025-11-02"),
    },
    {
      userId: user.id,
      title: "Microsoft 365",
      amount: "99",
      transactionType: "SUS",
      date: new Date("2025-11-01"),
    },
    {
      userId: user.id,
      title: "Laura Gomez",
      amount: "120",
      transactionType: "CASH_IN",
      date: new Date("2025-10-31"),
    },
    {
      userId: user.id,
      title: "Pedro Sanchez",
      amount: "75",
      transactionType: "CASH_OUT",
      date: new Date("2025-10-30"),
    },
    {
      userId: user.id,
      title: "Amazon Prime",
      amount: "14",
      transactionType: "SUS",
      date: new Date("2025-10-29"),
    },
    {
      userId: user.id,
      title: "Sofia Torres",
      amount: "180",
      transactionType: "CASH_IN",
      date: new Date("2025-10-28"),
    },
    {
      userId: user.id,
      title: "Diego Lopez",
      amount: "65",
      transactionType: "CASH_OUT",
      date: new Date("2025-10-27"),
    },
    {
      userId: user.id,
      title: "Dropbox",
      amount: "25",
      transactionType: "SUS",
      date: new Date("2025-10-26"),
    },
    {
      userId: user.id,
      title: "Valentina Ruiz",
      amount: "140",
      transactionType: "CASH_IN",
      date: new Date("2025-10-25"),
    },
    {
      userId: user.id,
      title: "Ricardo Morales",
      amount: "90",
      transactionType: "CASH_OUT",
      date: new Date("2025-10-24"),
    },
    {
      userId: user.id,
      title: "Slack",
      amount: "35",
      transactionType: "SUS",
      date: new Date("2025-10-23"),
    },
    {
      userId: user.id,
      title: "Isabella Fernandez",
      amount: "160",
      transactionType: "CASH_IN",
      date: new Date("2025-10-22"),
    },
  ];

  await prisma.transaction.createMany({
    data: transactions,
  });

  console.log("Database seeded successfully!");
};

seedData()
  .catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


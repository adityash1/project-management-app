import { Suspense } from "react";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";

import Greeting from "@/components/Greeting";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import NewProject from "@/components/NewProject";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";

// import {Table} from "@/components/ui";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

// export function TableDemo() {
//   return (
//     <Table>
//       <TableCaption>A list of your recent invoices.</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-[100px]">Invoice</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Method</TableHead>
//           <TableHead className="text-right">Amount</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {invoices.map((invoice) => (
//           <TableRow key={invoice.invoice}>
//             <TableCell className="font-medium">{invoice.invoice}</TableCell>
//             <TableCell>{invoice.paymentStatus}</TableCell>
//             <TableCell>{invoice.paymentMethod}</TableCell>
//             <TableCell className="text-right">{invoice.totalAmount}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )
// }

const getData = async () => {
  const user = await getUserFromCookie(cookies());

  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });
  return { projects };
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0];
  const formattedTime = date.toISOString().split("T")[1].split(".")[0];
  return `${formattedDate} ${formattedTime}`;
};

export default async function HomePage() {
  const { projects } = await getData();

  return (
    <div className="h-full w-full">
      <div className="flex-1 grow flex">
        <Suspense fallback={<GreetingsSkeleton />}>
          <Greeting />
        </Suspense>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pages</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.name}>
              <TableCell>
                <Link href={`/project/${project.id}`}>{project.name}</Link>
              </TableCell>
              <TableCell>{formatDate(project.createdAt)}</TableCell>
              <TableCell>{formatDate(project.updatedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

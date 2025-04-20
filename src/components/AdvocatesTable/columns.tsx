"use client";

import { ColumnDef } from "@tanstack/react-table";

import { AdvocateT } from "@/app/api/advocates/route";

export const columns: ColumnDef<AdvocateT>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "degree",
    header: "Degree",
  },
  {
    accessorKey: "specialties",
    header: "Specialties",
    cell: ({ row }) => {
      const specialties = row.original.specialties as string[];
      return (
        <ul className="list-disc pl-4">
          {specialties.map((specialty, index) => (
            <li key={index}>{specialty}</li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "yearsOfExperience",
    header: "Years of Experience",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => {
      const phoneNumber = row.original.phoneNumber;
      const formatted = phoneNumber
        .toString()
        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

      return formatted;
    },
  },
];

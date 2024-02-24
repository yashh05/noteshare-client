import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Role } from "@/tsTypes";
import { useRecoilValueLoadable } from "recoil";
import { DocSettingAtom } from "@/atoms/atoms";
import { useNavigate, useParams } from "react-router-dom";

import { handleDeleteDoc, handleRemoveRole } from "@/lib/docSetting.util";

import AddNewRole from "@/components/dialogs/addNewRole";
import { Skeleton } from "@/components/ui/skeleton";

export type DocSettingType = {
  role: Role;
  email: string;
};

export type DocUserType = {
  role: Role;
  email: string;
};

export const columns: ColumnDef<DocSettingType>[] = [
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const { id } = useParams();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              Copy Email ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className=" font-normal w-full"
                onClick={() => {
                  handleRemoveRole({
                    docId: id,
                    email: user.email,
                    role: user.role,
                  });
                }}
              >
                Remove
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTable() {
  const { id } = useParams();
  if (!id) {
    return (
      <>
        <h1>Invalid route</h1>
      </>
    );
  }
  const navigate = useNavigate();

  const docAllUser = useRecoilValueLoadable(DocSettingAtom(id));

  const table = useReactTable({
    data: docAllUser.contents,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (docAllUser.state === "loading") {
    return (
      <div className=" w-[100vw] mt-[20vh] flex flex-col gap-[5vh]">
        <Skeleton className="h-4 w-[50vw] m-auto bg-slate-400" />
        <Skeleton className="h-4 w-[60vw] m-auto bg-slate-400" />
        <Skeleton className="h-4 w-[70vw] m-auto bg-slate-400" />
      </div>
    );
  } else if (docAllUser.state === "hasError") {
    return <p>Error</p>;
  } else {
    return (
      <div className=" w-2/3 m-auto">
        <div className="flex items-center justify-between gap-[2vw] py-[4vh]">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex gap-[2vw] items-center">
            <AddNewRole id={id} />
            <Button
              variant="destructive"
              onClick={() => handleDeleteDoc({ docId: id, navigate })}
            >
              DELETE
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

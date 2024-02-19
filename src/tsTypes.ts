export enum Role {
  Admin = "Admin",
  readOnly = "readOnly",
  readWrite = "readWrite",
}

export type Doc = {
  name: string;
  desc?: string;
  docId: string;
  role: Role;
};

// TODO: match these to the tables created.
// PUBLIC_TABLE: RLS lets anyone (anon) read it, shown on the sign-up screen.
// PROTECTED_TABLE: RLS lets only signed-in users read it, shown on the home screen.
export const PUBLIC_TABLE = "public_items";
export const PROTECTED_TABLE = "protected_items";

// Columns the lists expect in both tables.
export type Item = {
  id: number | string;
  title: string;
  description?: string | null;
};

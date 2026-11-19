
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import type { Item } from "@/lib/tables";

// Loads all rows of a table. RLS on the server decides which rows come back.
// I used this to simulate a "public" table that anyone can read
export function useItems(table: string) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from(table)
        .select("id, title, description")
        .order("id");

      if (error) throw error;

      setItems((data ?? []) as Item[]);
    } catch {
      setError("Couldn't load data. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [table]);

  useEffect(() => {
    load();
  }, [load]);

  return { items, loading, error, reload: load };
}

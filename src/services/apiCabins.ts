import supabase from "./supabase";

interface CabinData {
  name: string | null;
  description: string | null;
  image: string | null;
  maxCapacity: number | null;
  regularPrice: number | null;
  discount: number | null;
}

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins couldn't be loaded");
  }

  return cabins;
}

export async function insertCabin(newCabin: CabinData) {
  const { data, error } = await supabase.from("cabins").insert([newCabin]);

  if (error) {
    const message = error?.message || "Cabin couldn't be created!";
    throw new Error(message);
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabin couldn't be deleted~");
  return data;
}

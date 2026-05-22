import supabase from "./supabase";

interface InsertCabinArgs {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File;
}

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins couldn't be loaded");
  }

  return cabins;
}

export async function insertCabin(newCabin: InsertCabinArgs) {
  // 1. Generate a completely unique file path name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );

  // 2. Generate the public bucket URL path to insert into your table row
  const imagePath = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

  // 3. Insert the clean metadata object into your database
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message || "Cabin couldn't be created!");
  }

  // 4. Fire the binary stream to your Supabase Storage Bucket
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 5. Rollback strategy if file fails to upload
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded; cabin creation rolled back.",
    );
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabin couldn't be deleted~");
  return data;
}

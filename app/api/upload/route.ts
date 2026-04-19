// app/api/upload/route.ts
import { supabaseAdmin } from "@/lib/supabase";

// export async function POST(request: Request) {
//   const formData = await request.formData();
//   const file = formData.get("file") as File;

//   const fileName = `${Date.now()}-${file.name}`;
//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const { error } = await supabaseAdmin.storage
//     .from("products_images")
//     .upload(fileName, buffer, {
//       contentType: file.type,
//     });

//   if (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }

//   const { data } = supabaseAdmin.storage
//     .from("products_images")
//     .getPublicUrl(fileName);

//   return Response.json({ url: data.publicUrl });
// }

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  console.log("File:", file); // чи є файл?

  const fileName = `${Date.now()}-${file.name}`;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const { error } = await supabaseAdmin.storage
    .from("products_images")
    .upload(fileName, buffer, {
      contentType: file.type,
    });

  console.log("Upload error:", error); // яка помилка?

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage
    .from("products_images")
    .getPublicUrl(fileName);

  console.log("Public URL:", data.publicUrl); // чи є URL?

  return Response.json({ url: data.publicUrl });
}

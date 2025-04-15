import { readSingleBookDetails } from "@/backend/controller/booksController";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const { error, response } = await readSingleBookDetails(id);
    if (error) {
      return Response.json({ message: response.message }, { status: 404 });
    }

    return Response.json(
      { data: response.data, message: response.message },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: error?.message || "Unexpected error occurred" },
      { status: 500 }
    );
  }
}

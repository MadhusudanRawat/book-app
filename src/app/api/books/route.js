import { getBookList, searchBooks, addNewBookInStore } from "@/backend/controller/booksController";

export async function GET(request) {
  try {
    const q = request.nextUrl.searchParams.get("q");

    if (q) {
      const { error, response } = await searchBooks(q);
      if (error) {
        return Response.json({ message: response.message }, { status: 404 });
      }
      return Response.json(
        { data: response.data, message: response.message },
        { status: 200 }
      );
    }

    const { error, response } = await getBookList();
    if (error) {
      return Response.json({ message: response.message }, { status: 500 });
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


export async function POST(request) {
  try {
    const body = await request.json();
    const result = await addNewBookInStore(body);
    return Response.json(result, { status: result.statusCode });
  } catch (error) {
    return Response.json(
      {
        statusCode: 500,
        success: false,
        message: error.message || "Internal Server Error",
        data: null,
      },
      { status: 500 }
    );
  }
}

import type { SearchResponse } from "./types";

/**
 * Searches Open Library.
 * TODO(task 7): build the URL with URLSearchParams (q, page, limit 20 and
 * fields=key,title,author_name,first_publish_year,cover_i), send the
 * User-Agent line from the kit's data/books/README.md, and throw an Error that
 * names the status when response.ok is false.
 * TODO(task 17): accept an AbortSignal so an old search can be cancelled.
 */
export async function searchBooks(query: string, page = 1): Promise<SearchResponse> {
  throw new Error("TODO(task 7): searchBooks");
}

// TODO(task 9): getWork(id) for /works/<id>.json.

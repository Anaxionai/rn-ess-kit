// The shapes of Open Library's answers. See the kit's data/books/README.md.
//
// TODO(task 7): copy your types from task 6: BookDoc (key, title, and the
// optional author_name, first_publish_year, cover_i), SearchResponse
// (numFound, start, docs) and Work (title, and description as a string, an
// object { type, value }, or missing). Mark every field that may be missing with ?.
// The placeholders below only let the starter compile: replace them.

export type BookDoc = { key: string; title: string };

export type SearchResponse = { numFound: number; start: number; docs: BookDoc[] };

export type Work = { title: string };

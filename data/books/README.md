# BookShelf data: the Open Library API

BookShelf (P2) searches the [Open Library](https://openlibrary.org) catalogue. Open Library is run by the Internet Archive, a non-profit. Its API is free and needs **no key and no account**.
This folder is the same in the Flutter kit and the React Native kit.

Checked on 24 November 2026 against https://openlibrary.org/developers/api, https://openlibrary.org/dev/docs/api/search, https://openlibrary.org/dev/docs/api/books and https://openlibrary.org/dev/docs/api/covers.

## The three addresses BookShelf uses

### 1. Search: `https://openlibrary.org/search.json`

```text
https://openlibrary.org/search.json?q=pride+and+prejudice&fields=key,title,author_name,author_key,first_publish_year,cover_i,edition_count&limit=20&page=1
```

| Parameter | What it does |
|---|---|
| `q` | The search words. Encode them for a URL: spaces become `+` or `%20`. Dart's `Uri.https` and JavaScript's `URLSearchParams` do this for you. |
| `fields` | Which fields to send back, separated by commas. **Always send it**: without it each result is much larger. Never use `fields=*`, which the docs call "an expensive response". |
| `limit` | How many results in one page. Use 20. |
| `page` | Which page, starting at 1. Use it with `limit` to load more as the user scrolls. (`offset` also works.) |
| `title`, `author` | Search one field only, for example `author=austen`. Optional. |
| `sort` | `new`, `old`, `random` or `key`. Leave it out to sort by relevance. |
| `lang` | A two-letter language code such as `en`. It favours that language but does not hide the others. |

The answer:

| Field | Type | Notes |
|---|---|---|
| `numFound` (also `num_found`) | number | How many books match in total. Use it to know when there are no more pages. |
| `start` | number | Position of the first result in this page, from 0 |
| `docs` | list | The results. Each one is a **work** (a book, across all its editions). |
| `docs[].key` | string | The work's address, such as `/works/OL66554W`. Use it to open the detail screen. |
| `docs[].title` | string | Always there |
| `docs[].author_name` | list of strings | **May be missing.** Show "Unknown author". |
| `docs[].author_key` | list of strings | Author ids such as `OL21594A`. May be missing. |
| `docs[].first_publish_year` | number | **May be missing.** |
| `docs[].cover_i` | number | The cover id for the covers address below. **May be missing**: show a placeholder. |
| `docs[].edition_count` | number | How many editions the work has |

### 2. A work: `https://openlibrary.org/works/<id>.json`

```text
https://openlibrary.org/works/OL66554W.json
```

The key from a search result already starts with `/works/`, so the address is `https://openlibrary.org` + `key` + `.json`.

| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `description` | **a string, or an object** `{"type": "/type/text", "value": "..."}`, or missing | The same field comes in two shapes. Your parser must accept both, and show "No description" when it is missing. The sample has the object shape. |
| `covers` | list of numbers | Cover ids. May be missing. Skip any id that is not a positive number. |
| `authors` | list of `{"author": {"key": "/authors/OL21594A"}, ...}` | Only the author ids. The names are in the search result: pass them to the detail screen with the key. |
| `subjects` | list of strings | May be missing |
| `first_publish_date` | string | Free text, such as `1853` or `January 1938`. Show it as it is: do not parse it as a date. |

### 3. A cover image: `https://covers.openlibrary.org/b/id/<cover id>-<size>.jpg`

```text
https://covers.openlibrary.org/b/id/14348537-M.jpg
```

- Size is `S` (small), `M` (medium) or `L` (large). Use `M` in lists and `L` on the detail screen.
- The address answers with a redirect (HTTP 302) to the Internet Archive, where the image lives. Image widgets and `http`/`fetch` follow it for you.
- Add `?default=false` to get a 404 for a missing cover, instead of a blank image.
- Use the cover **id** (`cover_i` or `covers`). The docs say covers looked up by other keys (such as ISBN) are limited to 100 requests per IP address every 5 minutes; lookups by cover id and OLID are not.

## Polite use (please read)

The developer page asks every app to:

- **Identify itself with a `User-Agent` header** that names the app and gives a contact. The course's line is exactly:

  ```text
  User-Agent: BookShelf-course/1.0 (contact: <centre email>)
  ```

  Replace `<centre email>` with the contact email your mentor gives you for the centre. **Never put your own name, email or phone number in it**: the header goes to a third party with every request. In a browser (Flutter web, Expo web) the browser may replace the User-Agent with its own; that is fine.
- **Keep to the rate limit.** Requests without an identifying User-Agent may make **1 request a second**; identified requests get **3 a second**. Search-as-you-type with a debounce (P2) keeps you far below this.
- **Not bulk-download.** Never loop over thousands of searches. For big data jobs, Open Library publishes monthly data dumps instead.
- Cache what you have already loaded (P2 does), so the app asks again only when it must.

If Open Library is slow or down, that is not your bug: it is exactly what your loading and error states and your cache are for.

## The saved samples

Both files were fetched on **24 November 2026** and trimmed, so your tests can run with no network.

| File | Fetched from | Trimmed to |
|---|---|---|
| `sample-search.json` | `https://openlibrary.org/search.json?q=beowulf&fields=key,title,author_name,author_key,first_publish_year,cover_i,edition_count&limit=20&page=1` | 6 of the 20 results (numbers 1, 3, 4, 11, 12 and 20), in their original order; the top-level fields unchanged (`numFound` was 2202) |
| `sample-work.json` | `https://openlibrary.org/works/OL66554W.json` (*Pride and Prejudice*) | 12 fields; `subjects` cut to 8; `links`, `excerpts` and the other long fields removed |

The six books in `sample-search.json`, and what each one tests. Every field in them is real; only whole results were left out:

| # | `key` | Title, author | What is special |
|---|---|---|---|
| 1 | `/works/OL1810107W` | *Beowulf*, Seamus Heaney, 2000 | Complete: every field is there |
| 2 | `/works/OL42695W` | *Beowulf*, Michael Morpurgo, Michael Foreman, Michael Foreman | Three names in `author_name`, one of them twice |
| 3 | `/works/OL254325W` | *Beowulf*, "Anonymous", 1877 | The author is the text `Anonymous` |
| 4 | `/works/OL16458587W` | *Beowulf*, 1992 | **No `author_name` and no `author_key`**: show "Unknown author" |
| 5 | `/works/OL21800645W` | *Beowulf*, J.R.R. Tolkien | **No `first_publish_year`**, and `edition_count` is 0 |
| 6 | `/works/OL18492283W` | *Beowulf*, Burton Raffel, 1963 | **No `cover_i`**: show a placeholder |

In `sample-work.json`, `description` is the **object** shape and `first_publish_date` is the text `1853`. For the other shape, the work `https://openlibrary.org/works/OL45804W.json` had a plain-string `description` on 24 November 2026; or write a small test value such as `{"title": "Test", "description": "Plain text"}`.

The real catalogue changes every day, so a live search may now return different counts and results. Your tests use the saved files, which never change.

## How to use the samples in a test

1. Copy the file you need into the test folder your task names, for example `test/fixtures/` (Flutter) or `src/test/fixtures/` (React Native).
2. Give your book repository (or API module) a **fake client** that returns the file's text with status 200, instead of calling the network.
3. Test the parsed result: `numFound` is 2202, six books, the first one's title is `Beowulf` by Seamus Heaney, the fourth has an empty author list, the fifth has no year and the sixth has no cover.
4. Write one more fake that returns status 500, and one that throws a network error, to test your error state.

## About the data

The samples are Open Library catalogue records, saved for testing. Open Library says the Internet Archive "does not assert any new copyright" over its database, and that some contributions may still carry rights of their own (https://openlibrary.org/developers/licensing). The work description is Open Library's text, kept short here. Book titles and author names are facts. If your app shows Open Library data, say so on an About screen, for example: *Book data and covers from Open Library (openlibrary.org).*

# Capstone brief: ExpenseSplit

**Hard rule:** Balances always sum to zero.

This brief is a starting point. Your `PLAN.md` (from [`../PLAN-template.md`](../PLAN-template.md)) turns it into your own specification: choose the stories, cut to fit the week, and get your mentor's approval on day 1 ([`../README.md`](../README.md)).

## The app

Friends on a trip pay for different things and lose track of who owes whom. ExpenseSplit keeps one trip's **expenses** (who paid, how much, for whom), shows each person's **balance**, and suggests who should pay whom to settle up.

**Users:** a group of 2 to 8 friends on a trip; one person enters the expenses (device storage), or everyone adds their own (Firestore with sign-in and a shared trip).

## The hard rule

**Balances always sum to zero.**

Every rupee someone paid for the group is owed by someone in the group, so the balances (paid minus owed) must add up to exactly 0, after every add, edit and delete.

The trap is money in decimals. `0.1 + 0.2` is not `0.3` in floating point, and 100.00 split three ways does not divide evenly. So: **store every amount as whole paise** (a `number` that is always a whole number: check it with `Number.isInteger` in a test), never as a decimal, and give the leftover paise to named people by a fixed rule.

Example: Asha pays 1,000.00 for a dinner shared by Asha, Ben and Chen. That is 100,000 paise; 100,000 / 3 = 33,333 with 1 paisa left over, which goes to the first person in the list. Shares: Asha 33,334, Ben 33,333, Chen 33,333. Balances: Asha +66,666, Ben -33,333, Chen -33,333. Sum: 0.

Edge cases to test (at least three):

1. **An amount that does not divide evenly** (100.00 among 3, 0.01 among 2).
2. **Editing or deleting an expense**: the balances still sum to 0 afterwards.
3. **Someone in no expenses**, or a person removed from the trip after expenses (forbid it, or move their share: choose in the plan).
4. **A very large trip**: 1,000 generated expenses still sum to exactly 0 paise.
5. **Input in rupees with two decimals** (`"12.5"`, `"12.50"`, `"12,50"`): parsed to paise once, at the edge of the app; reject bad input.

## User stories to start from

Pick, change and add; your plan needs 6 to 10.

- S01 Create a trip and add its people.
- S02 Add an expense: what, amount, who paid, split equally among the chosen people.
- S03 See each person's balance (owes or is owed), always summing to zero.
- S04 Edit or delete an expense.
- S05 See the list of expenses, newest first.
- S06 See "who pays whom" to settle up in as few payments as practical.
- S07 Mark a settlement as paid.
- S08 Nice: split by exact amounts instead of equally.
- S09 Nice: share the trip with friends' accounts (Firestore).

## Screens

1. **Trip** (main): balances at the top, expenses below, an add button.
2. **Add or edit expense**: the form, with validation.
3. **Settle up**: the suggested payments.
4. **People**: add and remove people.

## A suggested data model

Write it as TypeScript types:

- `Person`: `id`, `name`.
- `Expense`: `id`, `title`, `amountPaise` (a whole number), `paidBy` (a person id), `splitAmong` (person ids), `createdAt`.
- `balances(expenses, people)`: **worked out** every time from the expenses, never stored.

## How to test the hard rule

- Write `shares(amountPaise, peopleIds)`: a pure function that returns whole-paise shares that add up to the amount exactly, and `balances(...)`.
- Test the example above, each edge case, and a generated test: 1,000 generated expenses that repeat on every run (a formula such as `(i * 7919) % 99999 + 1` paise, or a seeded random function such as mulberry32 with the seed, 42, written in the test), with varied payers and splits; after each one, the balances sum to **exactly 0 paise**.
- Restart: save the trip, throw away the app's memory, load it, and expect the same balances.
- Break it on purpose: store amounts as decimals and split with `amount / n`. The generated test fails. Put the fix back.

## Out of scope

Real payments or UPI links, currencies other than one per trip, receipts as photos (no uploads on Spark), iOS.

---
id: 69c59c03-c5d1-45a5-aed8-3e065971bba1
title: The Quest for Typesafe APIs
lang: en
thumbnail: /typesafe-apis-banner.webp
order: 1
---

Over the past few days, I went down a rabbit hole researching how to build a fully **typesafe API** between a **Golang backend** and a **SolidJS frontend**. I wanted something that felt as seamless and developer-friendly as [`tRPC`](https://trpc.io/) in the TypeScript world — without sacrificing language agnosticism, and without getting bogged down in verbosity.

In this post, I’ll walk through the path I took: what I tried, what I rejected, and where I landed.

---

## What I Wanted

Before diving into the details, here’s what I was aiming for:

* **Type safety from backend to frontend**, ideally with **automatic code generation**.
* Minimal boilerplate and **developer ergonomics**.
* No REST dogma for the sake of it — happy to use **RPC** or other protocols.
* Preferably **language-agnostic** tooling, not tied to the Node/JS ecosystem.

---

## What I Tried (and Rejected)

### GraphQL

I considered [GraphQL](https://graphql.org/), which is often recommended for typed APIs. It has some great tooling (like [gqlgen](https://github.com/99designs/gqlgen)) and a strong community.

But in my case:

* I didn’t need the ability to **pick and choose fields**.
* I found GraphQL to be **too verbose** for simple CRUD-style APIs (especially for my small side project).
* The setup required more boilerplate than I wanted.

**Verdict:** Great for some use cases, but overkill for mine.

---

### Swagger/OpenAPI via Swaggo

I also explored [Swaggo](https://github.com/swaggo/swag), a tool that generates an OpenAPI spec from Go code comments.

With that, I could use something like [Hey API](https://heyapi.dev/) or [orval](https://orval.dev/) to generate TypeScript clients.

But I hit a few frustrations:

* The annotation syntax was **cumbersome and fragile**:
  For example: `//@param x y z` — where the order matters and mistakes are easy.
* It’s all **comment-driven**, not code-driven — which felt brittle and repetitive.

**Verdict:** Works, but not ergonomic enough for long-term happiness (in my own opinion).

---

### Huma: A Better OpenAPI Experience?

I discovered [Huma](https://huma.rocks/) — an HTTP API framework for Go that auto-generates OpenAPI specs from actual code, not comments. It uses function calls like:

```go
huma.Get("/my/path", myHandler)
```

This felt a lot more intuitive than Swaggo. Huma generates the spec at runtime and gives you a much better DX.

While I haven’t used it in production yet, I plan to try it soon, possibly pairing it with:

* [Hey API](https://heyapi.dev/) for generating a TypeScript client
* [Zod](https://zod.dev/) for runtime type validation

**Verdict:** Promising, especially if you want to stay in the OpenAPI world.

---

### Why Not tRPC?

[tRPC](https://trpc.io/) is still my gold standard for DX: you write your functions once in TypeScript, and you get a fully typesafe API without code generation or schemas.

But tRPC is **tightly coupled to TypeScript** and **doesn’t exist outside the Node ecosystem** (yet). For a Go backend, I had to find something more agnostic — and that’s where Protobufs shine.

---

## Where I Landed: Protobuf + ConnectRPC

After a lot of trial and error, I found a setup that ticks almost all the boxes:

* [Protocol Buffers (Protobuf)](https://protobuf.dev/): a language-neutral serialization format developed by Google.
* [ConnectRPC](https://connectrpc.com/): a modern RPC framework for Go, from the team behind [Buf](https://buf.build/). It supports Protobufs and generates idiomatic clients and servers.
* The same Protobuf definitions generate:

  * a **Go server code**
  * a **TypeScript client** using `@connectrpc/connect-web` for the frontend

This gave me:

- ✅ Full type safety across the wire
- ✅ No need to write REST routes manually
- ✅ A smooth DX on both the backend and frontend

It feels like tRPC — but for Go and TypeScript, powered by Protobufs and clean code generation.

---

## Final Thoughts

There’s no one-size-fits-all solution for typesafe APIs. Your choice depends on your stack, your use case, and how much complexity you’re willing to take on. For me, **Protobuf + ConnectRPC** hit the sweet spot between performance, developer experience, and cross-language support.

If you're building a Go backend and want type-safe communication with a TypeScript frontend, give it a try.


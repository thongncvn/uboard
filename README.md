# Servme

To run dev:

Run this snippet from the repository's root:

```sh
SERVME_PATH="$(pwd)"
function servme() {
  deno run --allow-read $SERVME_PATH/servme/servme.ts build "$1" | deno run --allow-read --allow-write --allow-run $SERVME_PATH/servme/servme.ts serve "$1"
}
```

Serve the example API:

```sh
servme ./uboardserver/main.ts
```

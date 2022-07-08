# Servme

To run dev:

Copy this snippet and run from **the repo root**:

```sh
SERVME_PATH="$(pwd)"
function servme() {
  deno run --allow-read $SERVME_PATH/servme/servme.ts build "$1" | deno run --allow-read --allow-write --allow-run $SERVME_PATH/servme/servme.ts serve "$1"
}
```

Then you can use this snippet to run the handlers from anywhere:

```sh
servme ./uboardserver/main.ts
```

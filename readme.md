#Agility Notebook
I made this app so that someone can log their agility activity.
It allows them to add which dogs they have, which shows they attended, which runs they did, and how well they did at those runs.

There's an associated backend, which needs to be running for this to work.

The only config really needed, is the `src/config.js` files, which is just a JS file which sets global values.
Currently it only needs 1 value, which is `apiUrl` which points to the address of the API backend. E.g.:

`apiUrl = http://localhost:3000`

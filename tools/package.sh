#!/usr/bin/env bash

cd $(dirname $0)

rm -r ../web/lib
npm install --unsafe-perm
npm run lint -- --fix
# Compiled with Sencha Cmd v6.7.0.63
npm run build

# cd modern

# rm -r ../web/modern
# npm install
# npm run build_release
# mv build ../web/modern

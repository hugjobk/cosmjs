#!/bin/sh

set -e

if [ -z "$1" ]; then
  echo "org is required!"
  echo "e.g. sh build.sh {org}"
  exit 1
fi

rm -r build
mkdir build

for folder in packages/*/; do
  package=$(basename $folder)
  version=$(grep -Eo '"version": "[^"]+"' packages/$package/package.json | sed 's/"version": //; s/"//g')

  echo "Building @$1/$package@$version"

  mkdir build/$package
  cp packages/$package/README.md build/$package
  cp packages/$package/package.json build/$package
  cp -r packages/$package/build build/$package/build

  sed -in "s/\"name\": \"@cosmjs\/\(.*\)\"/\"name\": \"@$1\/\1\"/" build/$package/package.json
  rm build/$package/package.jsonn

  sed -in "s/\"@cosmjs\/\(.*\)\": \"workspace:^\"/\"@cosmjs\/\1\": \"npm:@$1\/\1@$version\"/g" build/$package/package.json
  rm build/$package/package.jsonn
done

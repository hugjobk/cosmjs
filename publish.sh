#!/bin/sh

set -e

# Get dir of current script

for folder in build/*/; do
  #  goto the folder
  echo "Publishing $folder"
  cd $folder
  #  publish the package
  npm publish
  #  go back to the root
  cd ../..
done

#!/bin/bash
pandoc \
  -t revealjs\
  --template templates/default.revealjs\
  -s ../Gliederung.md\
  --no-highlight \
  -o index.htm

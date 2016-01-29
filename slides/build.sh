#!/bin/bash
pandoc \
  -t revealjs\
  --template templates/default.revealjs\
  -s ../talk.md\
  --no-highlight \
  -o index.htm

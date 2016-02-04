#!/bin/bash
pandoc \
  -t revealjs\
  --template ./slides/templates/default.revealjs\
  -s talk.md\
  --no-highlight \
  -o slides/index.htm

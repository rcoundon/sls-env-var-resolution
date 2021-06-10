#!/bin/bash

export NODE_OPTIONS=--max_old_space_size=8192
export STAGE=local
# export SLS_DEBUG=*
echo Compiling Typescript...
tsc
echo Starting serverless offline...
node_modules/.bin/sls offline -s local start

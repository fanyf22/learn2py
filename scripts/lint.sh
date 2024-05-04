#!/bin/bash

mdtl src
next lint
prettier --write --log-level warn .

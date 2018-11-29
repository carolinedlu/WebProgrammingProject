#!/bin/bash

# PythonPip
GET_PIP=$(mktemp)
curl -o $GET_PIP https://bootstrap.pypa.io/get-pip.py
python3 $GET_PIP

# Pip libraries
pip install requests

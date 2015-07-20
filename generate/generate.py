#!/usr/bin/python
# -*- coding: utf-8 -*-

with open ("tpl1.html", "r") as header:
    head=header.read()

with open ("tpl2.html", "r") as footer:
    foot=footer.read()

files = {}


out = head+foot
with open("../index.html", "w") as text_file:
    text_file.write(out)

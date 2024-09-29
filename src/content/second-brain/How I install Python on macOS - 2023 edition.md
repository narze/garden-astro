---
title: How I install Python on macOS - 2023 edition
date: 2023-12-15
slug: how-i-install-python-in-2023
publish: true
tags:
  - notes
draft: false
no_feed: false
filepath: src/content/second-brain/How I install Python on macOS - 2023 edition.md
---

Prerequisite: asdf

* Add python plugin & install [`miniforge3`](https://conda-forge.org/miniforge) (as of writing it includes python 3.10.12)

```bash
asdf plugin add python
asdf install python miniforge3-latest
asdf global python miniforge3-latest
```

* Install [pipx](https://pipx.pypa.io)

```bash
python -m pip install --user pipx
```

* Install [poetry](https://python-poetry.org) using `pipx`

```bash
pipx install poetry
```

* Start project with `poetry new`

```bash
poetry new project-name
```

this is likely to change in the next year, since it's [Python](https://xkcd.com/1987)

import os, re
from io import StringIO
from typing import Iterable, TextIO


CHINESE = 2
ENGLISH = 1


def walk_files(
    dirname: str | None = None,
    pattern: re.Pattern | None = None
) -> Iterable[str]:
    """Walk through all files under the directory."""
    if dirname is None:
        dirname = os.getcwd()
    for _, _, filenames in os.walk(dirname):
        for filename in filenames:
            if pattern and not pattern.fullmatch(filename):
                continue
            yield filename


def compute_length(string: str) -> float:
    """Compute the length of a string"""
    length = 0
    for char in string:
        if ord(char) < 256:
            length += ENGLISH
        else:
            length += CHINESE
    return length


def nearest_int(number: float) -> int:
    """Find the nearest integer to the number."""
    return int(number + 0.5)


def lint_table(rows: list[str]) -> Iterable[str]:
    """Lint the table."""
    pat = re.compile(r'(?<!\\)\|')
    splited = [[item.strip() for item in pat.split(row)] for row in rows]
    lengths = [[compute_length(item) for item in row] for row in splited]
    column = max(len(row) for row in lengths)

    for i in range(column):
        if i >= len(lengths):
            lengths.append(0)

    maxes = [max(row[i] for row in splited) for i in range(column)]
    poses = [sum(maxes[:i]) for i in range(column)]

    for i, row in enumerate(splited):
        linted = []
        total_length = 0

        if i == 1:
            for j, item in enumerate(row):
                if not item:
                    linted.append('')
                    continue

                length = nearest_int(poses[i] - total_length)
                linted.append(':' * length)
                total_length += length

                if item.startswith(':'):
                    linted[-1] = ':' + linted[-1][1:]
                if item.endswith(':'):
                    linted[-1] = linted[-1][:-1] + ':'

        else:
            for j, item in enumerate(row):
                if not item:
                    linted.append('')
                    continue

                length = nearest_int(poses[i] - total_length - compute_length(item))
                linted.append(' ' + item + ' ' * (length - 1))
                total_length += compute_length(item) + length

        yield '|'.join(linted)


def lint_file(stream: TextIO):
    compiled = StringIO()
    table = []
    pat = re.compile(r'\s\|(.*?\|)+\s')

    for line in stream:
        if pat.fullmatch(line):
            table.append(line)
        else:
            if table:
                compiled.writelines(lint_table(table))
            compiled.writelines([line])

    stream.truncate()
    stream.seek(0)
    compiled.seek(0)
    stream.write(compiled.read())
    compiled.close()


pat = re.compile(r'.*\.mdx?')

for filename in walk_files(pattern=pat):
    with open(filename, 'rw') as stream:
        lint_file(stream)

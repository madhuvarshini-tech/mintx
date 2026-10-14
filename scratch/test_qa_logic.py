def test_javascript_integrity():
    with open("app.js", "r", encoding="utf-8") as f:
        js = f.read()

    # We can check using python's jslex or a proper regex-aware scanner
    stack = []
    in_string = False
    string_char = ''
    in_comment = False
    in_multiline_comment = False
    in_regex = False
    escaped = False

    i = 0
    lines = 1
    error = None

    while i < len(js):
        char = js[i]
        if char == '\n':
            lines += 1

        if in_comment:
            if char == '\n':
                in_comment = False
            i += 1
            continue

        if in_multiline_comment:
            if char == '*' and i + 1 < len(js) and js[i + 1] == '/':
                in_multiline_comment = False
                i += 2
                continue
            i += 1
            continue

        if in_string:
            if escaped:
                escaped = False
            elif char == '\\':
                escaped = True
            elif char == string_char:
                in_string = False
            i += 1
            continue

        if in_regex:
            if escaped:
                escaped = False
            elif char == '\\':
                escaped = True
            elif char == '/':
                in_regex = False
            i += 1
            continue

        # Check for comments
        if char == '/' and i + 1 < len(js):
            if js[i + 1] == '/':
                in_comment = True
                i += 2
                continue
            elif js[i + 1] == '*':
                in_multiline_comment = True
                i += 2
                continue
            elif js[i - 1:i] in ('(', '=', ':', ',', ';', '!') or js[i - 8:i] == 'replace(':
                in_regex = True
                i += 1
                continue

        # Check for strings
        if char in ('"', "'", '`'):
            in_string = True
            string_char = char
            i += 1
            continue

        # Brackets
        if char in ('{', '(', '['):
            stack.append((char, lines))
        elif char in ('}', ')', ']'):
            if not stack:
                error = f"Unmatched closing '{char}' at line {lines}"
                break
            top, top_line = stack.pop()
            matches = {'}': '{', ')': '(', ']': '['}
            if matches[char] != top:
                error = f"Mismatched bracket: expected '{matches[char]}' for '{char}' at line {lines}, opened at line {top_line}"
                break

        i += 1

    if error:
        print("FAIL:", error)
    elif stack:
        print(f"FAIL: Unclosed {len(stack)} opening tokens, e.g.: {stack[-5:]}")
    else:
        print("SUCCESS: app.js syntax token balance verified 100% clean!")

if __name__ == "__main__":
    test_javascript_integrity()

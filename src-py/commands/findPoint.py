def findC(xa, ya, cornerArray):
    for c in cornerArray:
        xb, yb = c
        for i in range(-2, 2):
            if xb == (xa + i):
                if yb == ya:
                    print("Skipped")
                    continue
                return [xb, yb]
            else:
                continue


def findB(ya, xb, yb):
    for i in range(-2, 2):
        if yb == (ya + i):
            return [xb, yb]
        else:
            continue

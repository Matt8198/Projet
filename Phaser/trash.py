def portee(longueur, centre):
    L = []
    c_lig, c_col = centre[0], centre[1]
    for i in range(1, longueur + 1):
        if c_lig + (i - 1) >= 0 and c_col >= 0:
            L.append([c_lig + (i - 1), c_col])
        for j in range(1, longueur - i + 1):
            if c_lig + (i - 1) >= 0 and c_col - j >= 0:
                L.append([c_lig + (i - 1), c_col - j])
            if c_lig + (i - 1) >= 0 and c_col + j >= 0:
                L.append([c_lig + (i - 1), c_col + j])

    for pos in L:
        i, j = pos
        if i > c_lig:
            if c_lig - (i - c_lig) >= 0 and j >= 0:
                L.append([c_lig - (i - c_lig), j])
    return L


L = portee(3, [3, 3])


for i in range(9):
    for j in range(14):
        if [i, j] in L:
            print("1", sep='', end=" ")
        else:
            print("0", sep='', end=" ")
    print()

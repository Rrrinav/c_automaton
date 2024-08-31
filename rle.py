def parse_rle(rle_string):
    lines = rle_string.strip().split('\n')
    pattern = []
    width, height = 0, 0
    row = []

    for line in lines:
        if line.startswith('#'):
            # Skip metadata lines
            continue
        elif line.startswith('x'):
            # Parse header line for width and height
            header_parts = line.split(',')
            width = int(header_parts[0].split('=')[1].strip())
            height = int(header_parts[1].split('=')[1].strip())
        else:
            count = 0
            for char in line:
                if char.isdigit():
                    # Accumulate digits to form a repeat count
                    count = count * 10 + int(char)
                elif char == 'b':
                    # Dead cells
                    row.extend([0] * (count if count > 0 else 1))
                    count = 0
                elif char == 'o':
                    # Live cells
                    row.extend([1] * (count if count > 0 else 1))
                    count = 0
                elif char == '$':
                    # End of line, add row to pattern
                    pattern.append(row)
                    row = []
                elif char == '!':
                    # End of pattern
                    break

            # If there's an incomplete row, append it to the pattern
            if row:
                pattern.append(row)
                row = []

    # Ensure the pattern has the correct dimensions
    while len(pattern) < height:
        pattern.append([0] * width)
    for i in range(len(pattern)):
        if len(pattern[i]) < width:
            pattern[i].extend([0] * (width - len(pattern[i])))

    return pattern


# Example RLE string
rle_data = """
#N glidertrain.rle
#O Bill Gosper
#C https://conwaylife.com/wiki/Glider_train
#C https://www.conwaylife.com/patterns/glidertrain.rle
x = 68, y = 33, rule = B3/S23
32b2o$31b2o$33bo17b6o6b2o$50bo5bo4bo4bo$56bo10bo$26b5o19bo4bo5bo5bo$
25bo4bo21b2o8b6o$30bo$18b2o5bo3bo23bo$18b2o7bo24bobo$14b3o4bo29bo5bo$
13bob2o5b2o11b2o15bobobobo6bo$b2o9b2obobo3b2o11bo2bo13b2o2bo3bo5b2o$o
2bo9b6o9b2o4bobo7b2o5b2o3b2obo4bob2o$b2o11b4o10b2o5bo8b2o7bo5bo4bobo$
50bobo11b2o2$50bobo11b2o$b2o11b4o10b2o5bo8b2o7bo5bo4bobo$o2bo9b6o9b2o
4bobo7b2o5b2o3b2obo4bob2o$b2o9b2obobo3b2o11bo2bo13b2o2bo3bo5b2o$13bob
2o5b2o11b2o15bobobobo6bo$14b3o4bo29bo5bo$18b2o7bo24bobo$18b2o5bo3bo23b
o$30bo$25bo4bo21b2o8b6o$26b5o19bo4bo5bo5bo$56bo10bo$50bo5bo4bo4bo$33bo
17b6o6b2o$31b2o$32b2o!
"""

pattern = parse_rle(rle_data)

for row in pattern:
    print(row)

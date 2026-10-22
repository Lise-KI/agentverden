
import random

with open('all_ids.txt') as f:
    ids = [line.strip() for line in f]
with open('exclusion_list.txt') as f:
    exclusion = f.read().split()

pool = [i for i in ids if i not in exclusion]

if len(pool) >= 2:
    random.seed()
    selected = random.sample(pool, 2)
    print(' '.join(selected))
else:
    print('NOT_ENOUGH_POOL')

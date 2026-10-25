import json, re, random

with open('src/data/useCases.ts', 'r') as f:
    content = f.read()
ids = re.findall(r'\"id\": \"([a-z0-9-]+)\"', content)

with open('daily-update/log.json', 'r') as f:
    log = json.load(f)

exclusion = set()
for run in log.get('runs', []):
    date_str = run.get('date', '')
    match = re.match(r'(\d{4}-\d{2}-\d{2})', date_str)
    if match and match.group(1) >= '2026-10-20':
        exclusion.update(run.get('trendingSelected', []))

pool = [i for i in ids if i not in exclusion]
random.seed()
if len(pool) >= 2:
    selected = random.sample(pool, 2)
    print(' '.join(selected))
else:
    print(' '.join(pool))

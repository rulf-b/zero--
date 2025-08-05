import json

with open('data/tv-screens.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    if item.get('brand') == 'PEAQ':
        item['brand'] = 'Peaq'

with open('data/tv-screens.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2) 
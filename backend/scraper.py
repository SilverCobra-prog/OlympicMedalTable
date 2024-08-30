import requests

def fetch_medal_data():
    url = "https://api.sportradar.com/olympics/production/v1/en/season/aaae84c9-9349-4636-81d9-d16183205939/table.json"
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        medals = []
        for item in data['countries']:
            for athlete in item['athletes']:
                medals.append({
                    'country': item['name'],
                    'gold': item['gold'],
                    'silver': item['silver'],
                    'bronze': item['bronze'],
                    'total': item['total'],
                    'flag_url': item['flag_url'],
                    'athlete_name': athlete['name'],
                    'athlete_id': athlete['id'],
                    'sport': athlete['sport'],
                    'event': athlete['event']
                })
        return medals
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")
        return []

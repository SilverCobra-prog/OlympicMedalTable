from flask import Flask, jsonify
from flask_cors import CORS
from database import initialize_database, update_medals, fetch_all_medals, fetch_athlete_details
from scraper import fetch_medal_data
from notifications import add_notification, get_notifications

app = Flask(__name__)
CORS(app)

# Initialize database on startup
initialize_database()

@app.route('/api/medals/update', methods=['POST'])
def update_medals_route():
    medals = fetch_medal_data()
    update_medals(medals)
    add_notification("Medal data has been updated.")
    return jsonify({'message': 'Medal data updated successfully'}), 200

@app.route('/api/medals', methods=['GET'])
def get_medals():
    medals = fetch_all_medals()
    return jsonify(medals), 200

@app.route('/api/athletes/<int:athlete_id>', methods=['GET'])
def get_athlete_details(athlete_id):
    athlete = fetch_athlete_details(athlete_id)
    if athlete:
        return jsonify(athlete), 200
    else:
        return jsonify({'error': 'Athlete not found'}), 404

@app.route('/api/notifications', methods=['GET'])
def get_notifications_route():
    return jsonify(get_notifications()), 200

if __name__ == '__main__':
    app.run(debug=True)

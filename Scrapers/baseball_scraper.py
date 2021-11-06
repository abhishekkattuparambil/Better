from selenium import webdriver
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime, date


cred = credentials.Certificate('better-567ce-firebase-adminsdk-rfwhu-bba0d6d6fa.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

baseball = 'https://www.bovada.lv/sports/baseball'
path = '/Users/abhishekkattuparambil/Desktop/PyScraper/chromedriver'

driver = webdriver.Chrome(path)
driver.get(baseball)

time.sleep(10)

group = driver.find_element_by_xpath('/html/body/bx-site/ng-component/div/sp-sports-ui/div/main/div/section/main/sp-path-event/div/sp-next-events/div/div/div[2]/div[1]')
periods = group.find_elements_by_class_name('period')
competitors = group.find_elements_by_class_name('competitors')
buttons = group.find_elements_by_class_name('bet-btn')
containers = group.find_elements_by_class_name('markets-container')


def reformat(time):
    #only AM/12PM times have : in the 3rd position
    if time[2] == ':':
        return time[:-3]
    return str(int(time[:1])+12) + time[1:-3]

empties = 0
for i in range(len(competitors)):
    empty = len(containers[i].find_elements_by_class_name('empty-bet'))
    empties += empty
    if empty == 0:
        event_pieces = competitors[i].text.strip().split("\n")
        date_pieces = periods[2*i+1].text.strip().split("\n")
        markets = [button.text for button in buttons[6*i-empties:6*i+6-empties]]
        date_formatted = datetime.strptime(date_pieces[0] + ' ' + reformat(date_pieces[1]), '%m/%d/%y %H:%M')
        db.collection('games').document(date_pieces[0]).collection('baseball').document(competitors[i].text.strip()).set({
            "date" : date_formatted,
            "away" : event_pieces[0],
            "away_pitcher" : event_pieces[1],
            "home" : event_pieces[2],
            "home_pitcher" : event_pieces[3],
            "away_spread" : markets[0],
            "home_spread" : markets[1],
            "away_ml" : markets[2],
            "home_ml" : markets[3],
            "over" : markets[4],
            "under" : markets[5]
        })

'''today = date.today()
def clearBaseball():
    docs = db.collection('baseball').where('date', '<', today).stream()
    for doc in docs:
        print(doc.id)
        docs = db.collection('baseball').document(doc.id).delete()

def clearBasketball():
    docs = db.collection('basketball').where('date', '<', today).stream()
    for doc in docs:
        print(doc.id)
        docs = db.collection('basketball').document(doc.id).delete()

clearBaseball()
clearBasketball()'''

import mysql.connector
import random

boyNames = ["Liam","Noah","Oliver","Elijah","James","William","Benjamin","Lucas","Henry","Theodore","Jack","Levi","Alexander","Jackson","Mateo","Daniel","Michael","Mason","Sebastian","Ethan","Logan","Owen","Samuel","Jacob","Asher","Aiden","John"]
girlNames = ["Olivia","Emma","Charlotte","Amelia","Ava","Sophia","Isabella","Mia","Evelyn","Harper","Luna","Camila","Gianna","Elizabeth","Eleanor","Ella","Abigail","Sofia","Avery","Scarlett","Emily","Aria","Penelope","Chloe","Layla","Mila","Nora"]
lastnames = ["Robbins","Dixon","Hunter","Mcdowell","Middleton","Howe","Benitez","Bright","Burch","Chaney","Brandt","Singh","Conner","Pope","Harris","Mcgrath","Buchanan","Ball","Spears","Randall","Andersen","Oliver","Shaffer","Sutton","Cooley"]
streets = ["Cemetery Road","7th Avenue","5th Street","Forest Drive","Route 29","State Street East","Virginia Street","7th Street","Maple Avenue","Hickory Street","Maiden Lane","High Street","14th Street","Colonial Avenue","Route 6","Euclid Avenue"]

sql = "INSERT INTO students(id, name, phone, email, birthdate, grade, address, gender) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="school"
)
cursor = db.cursor()

for _ in range(1, 5):
    gender = random.choice(["Male", "Female"])
    if (gender == "Male"):
        name = boyNames[random.randint(0, len(boyNames) - 1)] + " " + lastnames[random.randint(0, len(lastnames) - 1)]
    else:
        name = girlNames[random.randint(0, len(girlNames) - 1)] + " " + lastnames[random.randint(0, len(lastnames) - 1)]
    
    id = random.randint(1000000000, 9999999999)
    phone = str(random.randint(100, 999)) + "-" + str(random.randint(100, 999)) + "-" + str(random.randint(1000, 9999))
    birthdate = str(random.randint(1998, 2008)) + "/" + str(random.randint(1, 12)) + "/" + str(random.randint(1, 28))
    grade = random.randint(30, 100)
    address = str(random.randint(1000, 9999)) + " " + streets[random.randint(0, len(streets) - 1)]
    
    VALUES = (
        id,
        name,
        phone,
        f"{name}@email.com".lower().replace(" ", ""),
        birthdate,
        grade,
        address,
        gender
    )
    cursor.execute(sql, VALUES)

db.commit()
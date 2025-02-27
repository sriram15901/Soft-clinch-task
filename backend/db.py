import mysql.connector

conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Sriram@1592001',
    database='whatsapp_contacts'
)

cursor = conn.cursor()

import pandas as pd
from mysql import connector



def convert_translate2_to_csv():
    file = pd.read_excel("translate2.xlsx")[["name", "column_Text"]]
    new_row = []
    data = []
    for index, row in file.iterrows():
        if index == 0:
            continue
        if row["name"] == "english":
            new_row.append(row["column_Text"])
        elif row["name"] == "farsi":
            new_row.append(row["column_Text"])
        if len(new_row) == 2:
            data.append(new_row)
            new_row = []
    newFrame = pd.DataFrame(data=data, columns=["persian", "english"])
    newFrame.to_csv("translate2.csv")

def convert_final_to_csv():
    file = pd.read_excel("final.xlsx").drop("ردیف", axis=1).dropna()
    file.to_csv("final.csv")

def create_suggestions_table():
    mydbCursor.execute("CREATE TABLE IF NOT EXISTS SUGGESTIONS (email varchar(128), persian varchar(512), english varchar(512), PRIMARY KEY (english));")

def create_words_table():
    mydbCursor.execute("DROP TABLE IF EXISTS WORDS")
    mydbCursor.execute("CREATE TABLE IF NOT EXISTS WORDS (persian varchar(512), english varchar(512), PRIMARY KEY (english));")

def insert_to_table(filename):
    df = pd.read_csv(filename).dropna()
    sql = "INSERT IGNORE INTO WORDS VALUES(%s, %s)"
    val = []
    persian = list(df["persian"])
    english = list(df["english"])
    for i in range(len(persian)):
        val.append((persian[i].strip(), english[i].strip()))
    mydbCursor.executemany(sql, val)
    mydb.commit()


def create_users_table():
    mydbCursor.execute("CREATE TABLE IF NOT EXISTS USERS (username varchar(128), password varchar(128), PRIMARY KEY (username));")


mydb = connector.connect(
    host="37.152.180.96",
    user="root",
    passwd="stellardict",
    database="stellar",
    auth_plugin='mysql_native_password'
)

mydbCursor = mydb.cursor()


# convert_final_to_csv()
# convert_translate2_to_csv()
# create_words_table()
# create_suggestions_table()
create_users_table();
# insert_to_table("final.csv")
# insert_to_table("translate2.csv")


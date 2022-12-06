import datetime
import random

def getAdminToken():
    t = (datetime.datetime.strptime("2022-09-22 09:41:17.000000+08:00", "%Y-%m-%d %H:%M:%S.%f%z"))
    seed = int(t.timestamp())
    random.seed(seed)
    token = ''.join(random.choices('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=16))
    print({"token": token})

if __name__ == "__main__":
    getAdminToken()

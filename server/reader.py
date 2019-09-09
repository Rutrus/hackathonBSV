#!/usr/bin/env python
# coding: utf-8

import pandas as pd
import json
import os
import requests
import base64
import time
import numpy as np
from datetime import datetime

IS_RASPI = False
CONFIG_FILE = "config.json"

if IS_RASPI:
    import RPi.GPIO as io     
    io.setmode(io.BCM)
    io.setup(14, io.OUT)
    time.sleep(1)
    io.output(14,0)
    time.sleep(1)
    io.output(14,1)


def encode_client(client_id = "", client_secret = "", **kwargs):
    """Sets an ID:SECRET encoded in base64
    """
    return str(base64.b64encode(bytes(client_id + ':' + client_secret, 'utf-8')),'utf-8')


def getToken(client_id = None, client_secret = None, **kwargs):
    """Getter OAuth token.

    It saves the result JSON in 'token.txt'
    """
    assert client_id and client_secret, "client_id o client_secret están vacíos"
    os.system(f"curl --request POST --url 'https://www.moneybutton.com/oauth/v1/token' --header 'content-type: application/x-www-form-urlencoded' --header 'Authorization: Basic {encode_client(client_id, client_secret)}' --data grant_type=client_credentials   --data scope=application_access:write > token.txt ")
    token = json.loads(open("token.txt").read())
    return token


def saveConfig(client_id = "", client_secret = "", access_token = "", expires_in = 0, offset = 0, **kwargs):
    """Utility to format and update config.json

    The first time it generates a config file (with CONFIG_FILE name)
    You need to edit this config file with your MoneyBuytton app data (client_id and client_secret)
    Left the other fields in blank
    """
    config = {"client_id" : client_id, "client_secret" : client_secret, "expire":(time.time() + expires_in ) if expires_in else 0, "access_token": access_token, "offset": offset}
    json.dump({**config,**kwargs},fp=open(CONFIG_FILE,"w+"))
    if not client_id or not client_secret:
        msg = f"""Created {CONFIG_FILE} you need to complete it with client_id and client_secret.

If you still don't have an app, go to:
https://www.moneybutton.com/settings/apps/create
and create one.
"""
        print(msg)
        exit()


def readConfig():
    """Reads CONFIG_FILE with any data.

    If access_token is not setted up it will ask for it.
    Also saves expiry timestamp. It also checks the token is not expired.
    """
    config = {}
    if not os.path.isfile(CONFIG_FILE):
        saveConfig()

    config = json.loads(open(CONFIG_FILE).read())
    
    if config["client_id"] and config["client_secret"]:
        if not config["access_token"] or not config["expire"] or float(config["expire"]) < time.time():
            newToken = getToken(**config)
            config["access_token"] = newToken["access_token"]
            config["expire"] = time.time()+newToken["expires_in"]
            config = {**config, **newToken}
            saveConfig(**config)
    
    return config


def updateLimits(config):
    """Updates offset and saves it in CONFIG_FILE

    Necessary because limit is 100 and it shows the transactions since the beginning
    """
    NUM = 4
    config = {**config,**{"limit":100}}
    data = getTransactions(**config)
    increment = len(data["data"])
    config["offset"] += (increment-NUM) if increment >= NUM else 0
    config["limit"] = 40
    print("Offset set to: ",config["offset"]) if increment > NUM else None
    saveConfig(**config)


def decodeBytestring(bytestring):
    """Decoded content in the blockchain

    The text in OP_RETURN is encoded as bytestring, so this function decodes it.
    """
    return bytes.fromhex(bytestring).decode("utf8")


def getTransactions(access_token = "", limit = 10, offset = 0, **kwargs):
    """Asks for a list of transactions.

    Limit is for "data" object; but we will use "included" object instead.
    Offset is important for pagination of entries.
    If response is correct, it returns a JSON object.
    """
    if not access_token:
        print("You need a token. Complete client_id and client_secret in " + CONFIG_FILE)
        exit()
    headers = {'Authorization': 'Bearer ' + access_token}
    response = requests.get("https://www.moneybutton.com/api/v1/payments", headers=headers, params={"scope":"application_access:write", "limit":limit, "offset":offset})
    if response.status_code == 200:
        response = response.json()
        return response
    else:
        print("Status Code:", response.status_code)
        return None


def getCommands(json):
    """Parses json data of transactions. Take the "included" object and returns the "attributes" part."""

    scripts = list(filter(lambda x: x["attributes"]["script"] and x["attributes"]["script"].startswith('0 OP_RETURN 6d6f6e6579627574746f6e2e636f6d 75746638 '), json["included"]))
    attributes = list(map(lambda x: x["attributes"], scripts))
    return attributes


def execute(turn, element_id, timer=None):
    """Turns on/off the lights"""

    #assert element_id == "1", "Solo tenemos id=1"
    turn = turn.upper()
    if turn == "OFF": # entiendo que es off
        print("Apagando. ID:", element_id)
        io.output(14,1) if IS_RASPI else None
    elif turn == "ON":
        print("Encendiendo. ID:", element_id)
        io.output(14,0) if IS_RASPI else None
    else:
        print("Comando desconocido: ", turn)


previous = ""
while True:
    config = readConfig()
    updateLimits(config)
    timeSleep = 1
    time.sleep(timeSleep)

    transactions = getTransactions(**config)
    if not transactions:
        continue
    df = pd.DataFrame.from_records(getCommands(transactions))
    df.sort_values(by=["created-at"], ascending=False, inplace=True)
    df["text"] = df.script.apply(lambda x: decodeBytestring(x.split(" ",4)[4]))

    last = dict(df.iloc[0])
    if last["created-at"] <= previous:
        continue

    _, turn, element_id = last["text"].split("#", 3)
    execute(turn,element_id)
    previous = last["created-at"]
    print(f"\nReading every {timeSleep} second(s)...")


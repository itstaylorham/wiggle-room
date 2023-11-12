import subprocess

# WORK IN PROGRESS:  DO NOT RUN YET

# API
# proc0 = subprocess.Popen(["node", "/home/jeremy/Documents/WiggleHQ/api.js"]) #Requires endpoint

# Sequential bot activtion...
print('')
print("Wiggle Room Access Terminal\n")
print('v1.3.0')
print('')
print('ctrl+z to quit                  ')
print("")

while True:
    usrinpt = input(">>> ")
    if usrinpt == "heidi":
        print("Launching Heidi...")
        proc1 = subprocess.Popen(["python3", "/home/jeremy/Documents/WiggleHQ/Heidi/main.py"])
        
    elif usrinpt == "carma":
        print("Launching Carma...")
        proc2 = subprocess.Popen(["python3", "/home/jeremy/Documents/WiggleHQ/Carma/main.py"])
        print('')

    elif usrinpt == "igore":
        print("Launching Igore...")
        proc4 = subprocess.Popen(["python3", "/home/jeremy/Documents/WiggleHQ/Igore/main.py"])
        print('')

    elif usrinpt == "news":
        print("Launching Heidi News...")
        proc6 = subprocess.Popen(["node", "/home/jeremy/Documents/WiggleHQ/Heidi/news.js"])
        print('')

    elif usrinpt == "agro":
        print("Launching Agrotech...")
        proc5 = subprocess.Popen(["node", "/home/jeremy/Documents/WiggleHQ/Carma/agro-bot.js"])
        print('')

    elif usrinpt == "api":
        print("Launching API...")
        proc0 = subprocess.Popen(["node", "/home/jeremy/Documents/WiggleHQ/api.js"])
        print('')
    
    elif usrinpt == "all":
        print("Launching Heidi...")
        proc0 = subprocess.Popen(["python3", "/home/jeremy/Documents/WiggleHQ/Heidi/main.py"])
        print("Launching Carma...")
        proc1 = subprocess.Popen(["python3", "/home/jeremy/Documents/WiggleHQ/Carma/main.py"])
        print("Launching API...")
        proc2 = subprocess.Popen(["node", "/home/jeremy/Documents/WiggleHQ/api.js"])
        print("Launching Agrotech...")
        proc3 = subprocess.Popen(["node", "/home/jeremy/Documents/WiggleHQ/Carma/agro-bot.js"])
        print("Launching Igore...")
        proc4 = subprocess.Popen(["node", "/home/jeremy/Documents/WiggleHQ/Igore/main.js"])
        print("Launching Heidi News...")
        proc5 = subprocess.Popen(["node", "/home/jeremy/Documents/WiggleHQ/Heidi/news.js"])
        print('')
   ## Errors
    try:
        y = eval(usrinpt)
        if y: print(y)
    except:
        try:
            exec(usrinpt)
        except Exception as e:
            print("ERROR", e);
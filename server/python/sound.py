import pyglet
import sys
import time
import threading
import requests
import random
#sudo apt-get install python-pyglet
#sudo apt-get install libavbin-dev libavbin0


def playSound(filename):
    # Load media
    music = pyglet.resource.media(filename)
    global musicLength
    musicLength = music.duration
    player.volume = 1

    # Place music into queue
    player.queue(music)
    # global queueCount
    # queueCount += 1
    # print(queueCount)
    player.play()

    # beginCrossfade(musicLength)
    


    # Exit script when music ends
    pyglet.clock.schedule_once(exit_callback, music.duration)
    # pyglet.clock.schedule_once(updateQueue, music.duration)

def updateQueue():
    global queueCount
    queueCount -= 1
    print(queueCount)

def beginCrossfade(musicLength):
    # Threads for crossfade
    t = threading.Thread(target=depth75, args=(musicLength,))
    t2 = threading.Thread(target=depth80, args=(musicLength,))
    t3 = threading.Thread(target=depth85, args=(musicLength,))
    t4 = threading.Thread(target=depth90, args=(musicLength,))
    t5 = threading.Thread(target=depth95, args=(musicLength,))
    t6 = threading.Thread(target=depth100, args=(musicLength,))
    t.start()
    t2.start()
    t3.start()
    t4.start()
    t5.start()
    t6.start()

    # t.join()
    # t2.join()
    # t3.join()
    # t4.join()
    # t5.join()
    # t6.join()

# def beginCrossfadeShort(musicLength):
#     # Threads for crossfade
#     t = threading.Thread(target=depth75, args=(musicLength,))
#     t2 = threading.Thread(target=depth80, args=(musicLength,))
#     t3 = threading.Thread(target=depth85, args=(musicLength,))
#     t4 = threading.Thread(target=depth90, args=(musicLength,))
#     t5 = threading.Thread(target=depth95, args=(musicLength,))
#     t6 = threading.Thread(target=depth100Short, args=(musicLength,))
#     t.start()
#     t2.start()
#     t3.start()
#     t4.start()
#     t5.start()
#     t6.start()

# Crossfade functions based on percentage of song time played
def depth75(musicLength):
    sleepTime = musicLength*.75
    time.sleep(sleepTime)
    player.volume = .75

def depth80(musicLength):
    sleepTime = musicLength*.80
    time.sleep(sleepTime)
    player.volume = .5

def depth85(musicLength):
    sleepTime = musicLength*.85
    time.sleep(sleepTime)
    player.volume = .25

def depth90(musicLength):
    sleepTime = musicLength*.90
    time.sleep(sleepTime)
    player.volume = .125

def depth95(musicLength):
    sleepTime = musicLength*.95
    time.sleep(sleepTime)
    player.volume = .0625

def depth100(musicLength):
    sleepTime = musicLength
    time.sleep(sleepTime)
    player.volume = 1
    # global queueCount
    # queueCount -= 1
    # print(queueCount)


# If the music is cut short, update the queue count and then restart the checkForEnd thread
def depth100Short(musicLength):
    sleepTime = musicLength*.25
    time.sleep(sleepTime)
    player.volume = 1
    global queueCount
    queueCount -= 1
    print(queueCount)
    player.next()
    t = threading.Thread(target=checkForEnd, args=(musicLength,))
    t.start()


# Exit callback to return after music finishes
def exit_callback(arg):

    time.sleep(random.randint(1,5))
    print(random.randint(-5,5))

    executeSound(random.randint(-5,5))


# Execute sound based on argument passed to script
def executeSound(arg):
    if arg >= -5 and arg <= -2.5:
        playSound('leroy_swf.wav')
    elif arg > -2.5 and arg <= 0:
        playSound('dejavu.wav')
    elif arg > 0 and arg < 2.5:
        playSound('inception.wav')
    else:
        playSound('airhorn.wav')

# Queue next song
def queueMusic(arg):
    # take out sleep??
    time.sleep(5)
    executeSound(arg)

# Continuous loop that checks for either a next sog or if the song normally ends
def checkForEnd(musicLength):
    while True:
        global queueCount
        # If item is queued, begin short crossfade
        if queueCount >= 2:
            print("Begin short crossfade")
            beginCrossfadeShort(musicLength)
            return
        # If playtime reaches 75%, do normal crossfade
        elif player.time >= musicLength*.75:
            print("begin regular crossfade")
            beginCrossfade(musicLength)
            return


# Load media player
player = pyglet.media.Player()
global musicLength
global queueCount
queueCount = 0

# First sound
executeSound(1)


# # Thread to check for end
# t = threading.Thread(target=checkForEnd, args=(musicLength,))
# t.start()

# # Loop to get arg from server
# # If packet received, create new thread to push to queue
# change args 0 to the new parameter
# t2 = threading.Thread(target=queueMusic, args=(0,))
# t2.start()


pyglet.app.run()


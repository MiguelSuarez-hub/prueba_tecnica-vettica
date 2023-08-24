from random import *

def sort(arr):
    sorted = False
    while sorted == False:
        sorted = True
        for i in range(len(arr) - 1):
            if arr[i] > arr[i+1]:
                tmp = arr[i]
                arr[i] = arr[i+1]
                arr[i+1] = tmp
                sorted = False
    return arr

n = randint(1, 50)
testArr = [randint(1, 200) for i in range(n)]

print(testArr)
print(sort(testArr))



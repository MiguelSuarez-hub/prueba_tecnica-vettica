# Libreria random se utiliza netamente para generar numeros aleatorios
from random import *

def fizzbuzz(n):
    if (n % 3 == 0) & (n % 5 == 0):
        return "FizzBuzz"
    elif (n % 3 == 0) & (n % 5 != 0):
        return "Fizz"
    elif (n % 3 != 0) & (n % 5 == 0):
        return "Buzz"
    else:
        return n
    
n = 31
print("Ejemplos")
print(fizzbuzz(20))  
print(fizzbuzz(9))  
print(fizzbuzz(15))  
print(fizzbuzz(2))
print("Prueba con los numeros del 1 al 30") 
for i in range(1, n):
    print(fizzbuzz(i)) 

# prueba_tecnica-vettica
Prueba tecnica para el puesto de desarrollador web y de integración Junior para Vettica.

1. Implementar (Es decir, sin usar librerías) el ordenamiento BubbleSort.
    Crear un método que dada una lista desordenada de números, este retorne una lista ordenada con los respectivos números.

    Ejemplo:
        function sort([3, 2, 1, 8, 5]) -> [1, 2, 3, 5, 8]

    Nota: Puede usar cualquier lenguaje
    **Solución**
    Desarrollado con Python, la función sort con el ordenamiento bubblesort la realice utilizando un ciclo while y un ciclo for, el ciclo while se utiliza para iterar hasta que el arreglo este ordenado, mientras que el ciclo for se utiliza para realizar la comparación directa de los valores en cada posición del array.
    Tenemos 2 variables auxiliares que son *sorted* y *tmp*, *sorted* es la bandera que nos indicara cuando el arreglo este ordenado, *tmp* la utilizamos para almacenar un valor que subira de posición en el array.

    Adicional a esto se utilizo la libreria random para generar arreglos aleatorios para el ejercicio, de entre 1 y 50 posiciones y con valores entre 1 y 200.

    ```python
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
    ```

2. Resolución de problemas

    Crear un método que dado un entero N, devuelve un string dependiendo de:

    Si N es divisible en 3, devuelva "Fizz"
    Si N es divisible en 5, devuelva "Buzz"
    Si N es divisible en 3 y 5 devuelva "FizzBuzz"
    Si N no es divisible ni en 3 ni en 5, devuelva N

    Ejemplos:

        function fizzbuzz(20) -> Buzz
        function fizzbuzz(9) -> Fizz
        function fizzbuzz(15) -> FizzBuzz
        function fizzbuzz(2) -> 2

    Nota: Puede usar cualquier lenguaje
    **Solución**
    Desarrollado con python, la función fizzbuzz la realice utilizando if, elif y else, haciendo la validación si el modulo del número ingresado divido entre este caso 3 y 5 es igual a 0 se retornara fizz, buzz o fizzbuzz, se realizaron las validaciónes de la siguiente manera:

    | Divisible entre 3  | Divisible entre 5 | Divisible entre ambos | No es divisible entre ninguno |
    | ------------------ | ----------------- | --------------------- | --- |
    | número % 3 == 0 and número % 5 != 0  | número % 3 != 0 and número % 5 == 0  | número % 3 == 0 and número % 5 == 0  | no tenemos validación para este caso |
    | return "Fizz"  | return "Buzz  | return "FizzBuzz" | return número | 

    ```python
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
    ```

3. Desarrollo web y de integración

    Un cliente tiene la necesidad de hacer un aplicativo web (FrontEnd y BackEnd) en donde el usuario pueda:

Consultar información de su tarjeta tullave incluyendo el saldo.

    Para llevar a cabo esto, el cliente necesita hacer una integración con un API de un tercero que proporciona datos sobre la tarjeta tullave teniendo como restricción que esta API sólo puede ser consultada a través de un solo consumidor, es decir, se debe implementar un servicio de integración.
   
    El backend debe ser implementado en Java o Python.
   
    Se debe almacenar una trazabilidad en una base de datos relacional. La información de trazabilidad a guardar en la base de datos como mínimo debe ser la siguiente:

        Fecha y hora de consulta.
        Recurso solicitado (endpoint).
        Cuerpo completo de la consulta (payload)
        Encabezados de la consulta (headers)
        Información de autenticación (id del usuario)
        Método HTTP (POST, GET, PUT, DELETE, PATCH, etc)
        Tiempo total de procesamiento en milisegundos
        Código HTTP de respuesta entregada al cliente (200, 400, 500, etc)
        Código HTTP de respuesta entregada por el API tullave
        IP del cliente
   
    La documentación del API tullave está disponible en Swagger UI (amazonaws.com) y con las siguientes credenciales:
        Usuario: swagger
        Contraseña: 0l1NwV8cCEdy20Ka8$Z
    Para el consumo de los servicios se debe utilizar el token adjunto.
    Para el objetivo del ejercicio sólo debe usarse el apartado de "Balance and Information".

    Los servicios que se expongan a través del backend deben usar autenticación JWT.

    El frontend debe ser implementado en React.

    Condiciones:
La información debe ser almacenada en la base de datos manteniendo la integridad de la misma (A criterio del desarrollador)
El front debe consumir los microservicios creados, y NO debe consumir directamente los servicios prestados por el API brindada.
OPCIONAL. Entregar la solución en contenedores y con el orquestador respectivo (Sugerencia: Docker y docker-compose)

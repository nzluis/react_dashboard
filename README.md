# React Dashboard

## Buscador de fotografías a través de la Api de Unsplash

Single page application que nos facilita una serie de fotografías random desde el inicio

## Funcionalidad:
### Home
  - Nueva búsqueda con el término introducido, busqueda random si no introducimos ninguno
  - Añadir fotos a nuestra colección pulsando el botón :heavy_plus_sign:
  - Aumentar la imagen pulsando en cualquier punto de esta que no sea el botón, donde se activa la lupa. Se sale del _Zoom_ clickando o pulsando en cualquier punto de la pantalla

### My Photos
  - Buscador por descripción en nuestras imágenes guardadas. Se limpia la búsqueda al clickear :heavy_multiplication_x: en el buscador o pulsa `enter` con el input en blanco
  - Misma posibilidad de aumentar la imagen como en _Home_
  - Pulsando sobre :information_source: se despliega un modal con información de esa fotografía (alto, ancho, fecha en la que se guardó y número de likes). En esta ventana es posible descargarse la foto en su formato _full_. Tambien podemos modificar la descripción de la imagen a nuestro gusto
  - Pulsar sobre :heavy_minus_sign: para quitar esa fotografía de nuestra colección

Tanto agregar como eliminar fotografías dispone de `react-hot-toast` que confirma al usuario el éxito de la operación y si esa foto ya esta guardada
    





//EJERCICIO 1
function createMagicPotion(potions, target) {
    // Code here
    result = []
    min = 100
    for(let i=0; i<potions.length-1;i++){
        for(let j=i+1; j<potions.length; j++){
            if(potions[i]+potions[j]==target){
                if(j < min){
                    result.push([i,j])
                    min = j
                }               
            }
        }
    }
    console.log(result);    
    return result != [] ? result.slice(-1)[0] : undefined
}

const potions = [4, 5, 6, 2]
const target = 8

//EJERCICIO 2
function battleHorde(zombies, humans) {  
    let z=0,h=0
    for(let i=0;i<zombies.length;i++){
        z+= Number(zombies[i])
        h+= Number(humans[i])
    }

    if(h > z ){
        return `${h-z}h`
    }else if( z > h){
        return `${z-h}z`
    }else if( h == z){
        return 'x'
    }
}

const zombies = '242';
const humans = '334';

//EJERCICIO 3
function findSafestPath(dream) {
    function backtrack(x, y, currentCost, minCost) {
        // Si llegamos a la esquina inferior derecha
        if (x === dream.length - 1 && y === dream[0].length - 1) {
            return Math.min(currentCost, minCost);
        }

        // Mover hacia la derecha
        if (y + 1 < dream[0].length) {
            minCost = backtrack(x, y + 1, currentCost + dream[x][y + 1], minCost);
        }

        // Mover hacia abajo
        if (x + 1 < dream.length) {
            minCost = backtrack(x + 1, y, currentCost + dream[x + 1][y], minCost);
        }

        return minCost;
    }

    if (!dream || dream.length === 0 || dream[0].length === 0) {
        return 0;
    }

    // Iniciar el backtracking desde la esquina superior izquierda
    return backtrack(0, 0, dream[0][0], Infinity);
}

const dream = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ]

//EJERCICIO 4
function findTheKiller(whisper, suspects) {
    // Construir el patrón para la expresión regular
    let pattern = '^' + whisper.replace(/~/g, '.'); // Reemplazar '~' por '.' para coincidencias
    if (whisper.endsWith('$')) {
        pattern += '$'; // Añadir '$' si el susurro termina con '$'
    }

    // Crear la expresión regular, insensible a mayúsculas
    const regex = new RegExp(pattern, 'i');

    // Filtrar los sospechosos que coinciden con el patrón
    const matchingSuspects = suspects.filter(suspect => regex.test(suspect));

    // Determinar el resultado basado en el número de coincidencias
    if (matchingSuspects.length === 1) {
        return matchingSuspects[0]; // Un solo sospechoso coincide
    } else if (matchingSuspects.length > 1) {
        return matchingSuspects.join(','); // Múltiples coincidencias
    } else {
        return ''; // Sin coincidencias
    }
}

const whisper = 'd~~~~~a';
const suspects = ['Dracula', 'Freddy Krueger', 'Jason Voorhees', 'Michael Myers'];

//EJERCICIO 5
function escapePyramidHead(room) {
    const n = room.length;
    let startX, startY, targetX, targetY;

    // Encontrar las posiciones de T y ▲
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (room[i][j] === 'T') {
                targetX = i;
                targetY = j;
            } else if (room[i][j] === '▲') {
                startX = i;
                startY = j;
            }
        }
    }

    // Definir las direcciones de movimiento
    const directions = [
        [-1, 0], // arriba
        [1, 0],  // abajo
        [0, -1], // izquierda
        [0, 1]   // derecha
    ];

    // BFS para encontrar la distancia
    const queue = [[startX, startY, 0]]; // [x, y, pasos]
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    visited[startX][startY] = true;

    while (queue.length > 0) {
        const [x, y, steps] = queue.shift();

        // Comprobar si hemos alcanzado a T
        if (x === targetX && y === targetY) {
            return steps;
        }

        // Explorar las direcciones
        for (const [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;

            // Comprobar límites y si la celda está disponible
            if (newX >= 0 && newX < n && newY >= 0 && newY < n && 
                room[newX][newY] !== '#' && !visited[newX][newY]) {
                visited[newX][newY] = true;
                queue.push([newX, newY, steps + 1]);
            }
        }
    }

    // Si no se puede alcanzar T
    return -1;
}

const room = [
    ['.', '.', '#', '.', '▲'],
    ['#', '.', '#', '.', '#'],
    ['.', '.', '.', '.', '.'],
    ['#', '#', '#', '.', '#'],
    ['T', '.', '.', '.', '.'],
  ]

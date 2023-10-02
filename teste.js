function normalizeValue(rx, minOriginal, maxOriginal, minNew=4, maxNew=10) {
    if(rx <0){
    return minNew + ((rx - minOriginal) * (maxNew - minNew)) / (maxOriginal - minOriginal);
    }
}

// Exemplo de valor para rx
let rx = -120;

// Valores mínimos e máximos para rx (exemplo)
let minOriginal = 0;
let maxOriginal = 200;

// Normalizar rx para uma escala de 4 a 10
let normalizedRx = normalizeValue(rx, minOriginal, maxOriginal, 4, 10);

console.log('Valor normalizado de rx:', normalizedRx);

export function longNumberGenerator(number: number): string {
  if (number === 0) return 'zero'

  if (number < 0) return 'menos ' + longNumberGenerator(Math.abs(number))

  const parts = divideNumber(number)

  const millions = parts[0]
  const thousands = parts[1]
  const hundreds = parts[2]
  const decimal = parts[3]

  let inFull = ''

  if (millions > 0) inFull += longNumberGenerator(millions) + ' milhão '
  if (thousands > 0) inFull += longNumberGenerator(thousands) + ' mil '
  if (hundreds > 0) inFull += longNumberGenerator(hundreds) + ' '
  if (decimal > 0) inFull += 'e ' + longNumberGenerator(decimal) + ' centavos'

  return inFull.trim()
}

function divideNumber(number: number): number[] {
  const parts = []

  parts[0] = Math.floor(number / 1000000) // Milhões
  parts[1] = Math.floor((number / 1000) % 1000) // Milhares
  parts[2] = Math.floor((number / 100) % 10) // Centenas
  parts[3] = Math.floor((number % 1) * 100) // Casas decimais (centavos)

  return parts
}

// function getPartUnits(number: number): string {
//   const units = [
//     '',
//     'um',
//     'dois',
//     'três',
//     'quatro',
//     'cinco',
//     'seis',
//     'sete',
//     'oito',
//     'nove',
//   ]
//   return units[number]
// }

// function getSpecialPart(number: number): string {
//   const special = [
//     '',
//     'onze',
//     'doze',
//     'treze',
//     'catorze',
//     'quinze',
//     'dezesseis',
//     'dezessete',
//     'dezoito',
//     'dezenove',
//   ]
//   return special[number - 10]
// }

// function getPartTen(number: number): string {
//   const dozens = [
//     '',
//     '',
//     'vinte',
//     'trinta',
//     'quarenta',
//     'cinquenta',
//     'sessenta',
//     'setenta',
//     'oitenta',
//     'noventa',
//   ]
//   return dozens[Math.floor(number / 10)]
// }

// function obterParteCentena(numero: number): string {
//   const centenas = [
//     '',
//     'cento',
//     'duzentos',
//     'trezentos',
//     'quatrocentos',
//     'quinhentos',
//     'seiscentos',
//     'setecentos',
//     'oitocentos',
//     'novecentos',
//   ]
//   return centenas[Math.floor(numero / 100)]
// }

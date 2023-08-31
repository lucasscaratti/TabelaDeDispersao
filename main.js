const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  console.log("=== MENU ===");
  console.log("Você deseja ver a tabela de dispersão de quais opções?");
  console.log("1. Conto pequeno");
  console.log("2. Conto grande (Um conto de duas cidades - Charles Dickens)");
  rl.question("Digite o número da opção desejada: ", function (answer) {
    if (answer === "1") {
      programa("intro.txt", 293);
      rl.close();
    } else if (answer === "2") {
      programa("tale.txt", 36947);
      rl.close();
    } else {
      console.log("Digite um número de 1 a 2\n");
      menu();
    }
  });
}

function programa(nomeArquivo, tamanhoTabela) {
  fs.readFile(nomeArquivo, "utf8", (err, data) => {
    
   var frasesMinusculas = data.toString().toLowerCase(); 

  //  console.log(frasesMinusculas);
   
   //precisa consertar o .net ainda
   const REGEX = /[#]|[0-9]|[*]|[,]|[\]]|[\[]|[:]|[.]|[w]{3}|(\b[a-z]{1}\b)|[-]|[\/]|[']|[\?]|["]|[!]|[;]|[()]|[_]|[$]/g;
   const ROMAN_NUMERALS = /(?=\b[mcdxlvi]{1,6}\b)m{0,4}(?:cm|cd|d?c{0,3})(?:xc|xl|l?x{0,3})(?:ix|iv|v?i{0,3})/g;
   
   frasesMinusculas = frasesMinusculas.replace(REGEX, ' ');
   frasesMinusculas = frasesMinusculas.replace(ROMAN_NUMERALS, '');
    
   //  console.log(listaFrases);
   frasesMinusculas = frasesMinusculas.split(/\s+/);

    console.log(frasesMinusculas)

    var contadorDePalavras = {};

    for (const palavra of frasesMinusculas) {
      if (contadorDePalavras[palavra]) {
        contadorDePalavras[palavra]++;
      } else {
        contadorDePalavras[palavra] = 1;
      }
    }

    var palavrasEmOrdem = Object.keys(contadorDePalavras).sort(
      (a, b) => contadorDePalavras[b] - contadorDePalavras[a]
    );

    var listaTabelaAscii = [];

    for (let index = 0; index < palavrasEmOrdem.length; index++) {
      const totalSum = palavrasEmOrdem[index]
        .split("")
        .reduce((sum, element) => sum + element.charCodeAt(0), 0);
      listaTabelaAscii.push(totalSum);
    }

    var listaResto = [];

    listaTabelaAscii.forEach((element) => {
      listaResto.push(hash(element, tamanhoTabela));
    });

    // console.log(listaResto);

    var arrayFinal = Array(tamanhoTabela);

    for (let index = 0; index < listaResto.length; index++) {
      const palavra = palavrasEmOrdem[index];
      const quantidade = contadorDePalavras[palavra];
      let posicao = listaResto[index];

      while (arrayFinal[posicao]) {
        posicao = (posicao + 1) % arrayFinal.length;
      }

      const objeto = {
        posicao: posicao,
        palavra: palavra,
        quantidade: quantidade,
      };

      arrayFinal[posicao] = objeto;
    // console.log(palavra);

    }
    console.table(arrayFinal);
  });
}

function hash(value, M) {
  return value % M;
}

menu();

// Game odds and evens

const choice = process.argv[2].toLowerCase();
const number = Number(process.argv[3]);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const npcChoice = getRndInteger(0, 5);
console.log("Ímpar ou par!");

const total = number + npcChoice;

if (choice === "par" && total % 2 === 0) {
  console.log(
    `Você escolheu ${choice}, o seu número foi ${number}, o npc escolheu ${npcChoice}. Total: ${total}. Ganhou!`
  );
} else if (choice === "par" && total % 2 !== 0) {
  console.log(
    `Você escolheu ${choice}, o seu número foi ${number}, o npc escolheu ${npcChoice}. Total: ${total}. Perdeu!`
  );
} else if (choice === "impar" && total % 2 === 0) {
  console.log(
    `Você escolheu ${choice}, o seu número foi ${number}, o npc escolheu ${npcChoice}. Total: ${total}. Perdeu!`
  );
} else if (choice === "impar" && total % 2 !== 0) {
  console.log(
    `Você escolheu ${choice}, o seu número foi ${number}, o npc escolheu ${npcChoice}. Total: ${total}. Ganhou!`
  );
} else {
  console.log("Algo deu errado.");
}

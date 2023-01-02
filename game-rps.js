//Game Rock-paper-scissors

const choice = process.argv[2].toLowerCase();
const array = ["pedra", "papel", "tesoura"];
const npcChoice = array[Math.floor(Math.random() * array.length)];

console.log("Pedra, papel, tesoura!");

if (choice === npcChoice) {
  console.log(`Você escolheu ${choice}, o npc escolheu ${npcChoice}. Empate!`);
} else if (choice === "pedra" && npcChoice === "papel") {
  console.log(`Você escolheu ${choice}, o npc escolheu ${npcChoice}. Perdeu!`);
} else if (choice === "pedra" && npcChoice === "tesoura") {
  console.log(`Você escolheu ${choice}, o npc escolheu ${npcChoice}. Ganhou!`);
} else if (choice === "papel" && npcChoice === "tesoura") {
  console.log(`Você escolheu ${choice}, o npc escolheu ${npcChoice}. Perdeu!`);
} else if (choice === "papel" && npcChoice === "pedra") {
  console.log(`Você escolheu ${choice}, o npc escolheu ${npcChoice}. Ganhou!`);
} else if (choice === "tesoura" && npcChoice === "pedra") {
  console.log(`Você escolheu ${choice}, o npc escolheu ${npcChoice}. Perdeu!`);
} else if (choice === "tesoura" && npcChoice === "papel") {
  console.log(`Você escolheu ${choice}, o npc escolheu ${npcChoice}. Ganhou!`);
} else {
  console.log("Algo deu errado.");
}

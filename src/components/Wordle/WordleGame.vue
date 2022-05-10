<script setup lang="ts">
/* eslint-disable prettier/prettier */
import { reactive, ref } from "vue";
import {WordleGame} from "@/games/Wordle";

const game = reactive(new WordleGame());

function handleKey(event: KeyboardEvent) {
  let key = event.key;

  if (key == "Enter") {
    game.checkWord();
  } else if (key == "Backspace" || key == "Delete") {
    game.popLetter();
  } else {
    game.pushLetter(event.key);
  }
}

document.addEventListener("keyup", handleKey);
</script>

<template>
  <table>
    <tr v-for="(row, rowIdx) in game.rows" :key="rowIdx">
      <td
        v-on:keydown="handleKey"
        v-for="(cell, idx) in row.letters"
        :key="rowIdx.toString() + '-' + idx.toString()"
        :class="cell.status.toString()"
      >
        {{ cell.letter }}
      </td>
    </tr>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

td {
  border: 5px solid white;
  padding: 0;

  color: white;
  width: 80px;
  height: 80px;

  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
}

.exists {
  background: darkkhaki;
}

.correct {
  background: darkgreen;
}

.incorrect {
  background: darkgray;
}

.unchecked {
  background: lightgrey;
}
</style>

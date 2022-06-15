// Conditional (ternary operator)
const age = 18;
const isAllowed = age > 18 ? "Boleh" : "Tidak boleh";
console.log(isAllowed); // "Tidak boleh"

if (age > 18) isAllowed = "Boleh";

// ...
const x = undefined;
// Jika x tidak undefind, maka jalankan toUpperCase
// Jika x undefined, jangan jalankan toUpperCase()
console.log(x?.toUpperCase());

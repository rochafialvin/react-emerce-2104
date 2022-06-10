const mobil = { color: "black", wheels: 4 };

// copy semua property milik objek mobil
const mobil2 = { ...mobil }; // {color: "black", wheels: 4}

// copy semua property milik objek mobil dan menambah property baru year
const mobil3 = { ...mobil, year: 1998 }; // {color: "black", wheels: 4, year: 1998}

// copy semua property milik objek mobil dan mengubah value pada property color
const mobil4 = { ...mobil, color: "red" }; // {color: "red", wheels: 4}

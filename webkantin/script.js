const pesanan = [];

function rupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

function buatpesanan(nama, harga) {
    const menu = pesanan.find(function (item) {
        return item.nama === nama;
    });

    if (menu) {
        menu.jumlah++;
    } else {
        pesanan.push({ nama: nama, harga: harga, jumlah: 1 });
    }

    tampilkanPesanan();
    alert(nama + " berhasil ditambahkan ke transaksi.");
}

function ubahJumlah(index, perubahan) {
    pesanan[index].jumlah += perubahan;

    if (pesanan[index].jumlah === 0) {
        pesanan.splice(index, 1);
    }

    tampilkanPesanan();
}

function hapusPesanan(index) {
    pesanan.splice(index, 1);
    tampilkanPesanan();
}

function bayarSekarang() {
    if (pesanan.length === 0) {
        alert("Belum ada pesanan.");
        return;
    }

    let subtotal = 0;
    pesanan.forEach(function (item) {
        subtotal += item.harga * item.jumlah;
    });

    const diskon = subtotal >= 100000 ? 20 : subtotal >= 50000 ? 10 : 0;
    const totalBayar = subtotal - subtotal * diskon / 100;

    alert("Pembayaran sebesar " + rupiah(totalBayar) + " berhasil.");
    pesanan.length = 0;
    tampilkanPesanan();
}

function buatTombol(teks, aksi) {
    const tombol = document.createElement("button");
    tombol.type = "button";
    tombol.className = "hapus-item";
    tombol.textContent = teks;
    tombol.addEventListener("click", aksi);
    return tombol;
}

function tampilkanPesanan() {
    const daftarItem = document.getElementById("item");
    const totalPesanan = document.getElementById("total");

    if (!daftarItem || !totalPesanan) {
        return;
    }

    daftarItem.replaceChildren();
    let subtotal = 0;

    if (pesanan.length === 0) {
        const kosong = document.createElement("p");
        kosong.textContent = "Belum ada menu yang dipilih.";
        daftarItem.appendChild(kosong);
    }

    pesanan.forEach(function (item, index) {
        const jumlahHarga = item.harga * item.jumlah;
        subtotal += jumlahHarga;

        const baris = document.createElement("div");
        baris.className = "item-pesanan";

        const info = document.createElement("div");
        const nama = document.createElement("p");
        const namaTebal = document.createElement("strong");
        namaTebal.textContent = item.nama;
        nama.appendChild(namaTebal);

        const rincian = document.createElement("small");
        rincian.textContent =
            item.jumlah + " × " + rupiah(item.harga) + " = " + rupiah(jumlahHarga);
        info.append(nama, rincian);

        const tombol = document.createElement("div");
        tombol.append(
            buatTombol("−", function () { ubahJumlah(index, -1); }),
            document.createTextNode(" " + item.jumlah + " "),
            buatTombol("+", function () { ubahJumlah(index, 1); }),
            buatTombol("Hapus", function () { hapusPesanan(index); })
        );

        baris.append(info, tombol);
        daftarItem.appendChild(baris);
    });

    const persenDiskon = subtotal >= 100000 ? 20 : subtotal >= 50000 ? 10 : 0;
    const nilaiDiskon = subtotal * persenDiskon / 100;
    const totalBayar = subtotal - nilaiDiskon;

    totalPesanan.replaceChildren();
    [
        "Subtotal: " + rupiah(subtotal),
        "Diskon " + persenDiskon + "%: " + rupiah(nilaiDiskon),
        "Total bayar: " + rupiah(totalBayar)
    ].forEach(function (teks, index) {
        const baris = document.createElement("p");
        baris.textContent = teks;
        if (index === 2) {
            const tebal = document.createElement("strong");
            tebal.textContent = teks;
            baris.replaceChildren(tebal);
        }
        totalPesanan.appendChild(baris);
    });
}

tampilkanPesanan();

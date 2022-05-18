//add
//Cari buku sesuai kode, lihat statusnya, BNF, ANF atau tersedia. Kalau tersedia selanjutnya
//cari anggota sesuai kode. Selantunya
//cari petugas sesuai kode nya. Selanjutnya
//tambah data untuk meminjam ke dalam tabel peminjam. setelah itu
//pilih buku sesuai kode bukunya. Karna dipinjam maka stoknya akan berkurang. 
//lalu untuk stok bukunya akan di update pada tabel buku sesuai kode buku yang sudah dipilih sebelumnya

//dell
//cari data peminjaman sesuai nomernya di tabel pinjam. selanjutnya
//delete data peminjaman sesuai nomer pinjam. selanjutnya
//cari buku sesuai kodenya di tabel buku setelah itu
//update tabel buku sesuai kode buku

const db = require("../../config/connection");

module.exports = {
  add: (data, callBack) => {
    db.query( `select * from tb_buku where kd_buku = ?`, [data.kd_buku], (err, results) => {
        // console.log(!results[0]);
        // console.log(results[0].stok);
        // console.log(null);
        if (err) {
          console.log(err);
          return;
        } else if (!results[0]) {
          return callBack("BNF"); //nanti menampilkan book not found
        } else if (results[0].stok < 1) {
          return callBack("Habis"); //nanti menampilkan bool all over
        } else {
          db.query( `select kd_anggota from tb_anggota where kd_anggota = ?`, [data.kd_anggota], (err, results) => {
              if (err) {
                console.log(err);
                return;
              } else if (!results[0]) {
                return callBack("ANF"); //nanti menampilkan members not found
              } else {
                db.query( `select kd_petugas from tb_petugas where kd_petugas = ?`, [data.kd_petugas], (err, results) => {
                    if (err) {
                      console.log(err);
                      return;
                    } else if (!results[0]) {
                      return callBack("PNF"); //nanti menampilkan petugas not found
                    } else {
                      db.query( `insert into tb_pinjam set ?`, [data], (err, results) => {
                          if (err) {
                            return callBack(err);
                          } else {
                            db.query( `select * from tb_buku where kd_buku = ?`, [data.kd_buku], (err, results) => {
                                // console.log(!results[0]); // console.log(results[0].stok);
                                // console.log(null);
                                if (err) {
                                  console.log(err);
                                  return;
                                } else {
                                  hasil = results[0].stok - 1;
                                  db.query( `update tb_buku set stok=? where  kd_buku = ?`, [hasil, data.kd_buku]
                                  );
                                }
                              }
                            );
                          }
                          return callBack(null, results);
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  },

  get: (callBack) => {
    db.query(`select * from tb_pinjam`, [], (err, results) => {
      if (err) {
        return callBack(err);
      } else {
        return callBack(null, results[0]);
      }
    });
  },

  getId: (data, callBack) => {
    db.query( `select * from tb_pinjam where no_pinjam = ?`, [data], (err, results) => {
        if (err) {
          return callBack(err);
        } else {
          return callBack(null, results[0]);
        }
      }
    );
  },

  update: (data, callBack) => {
    db.query( `select * from tb_pinjam where no_pinjam=?`, [data.no_pinjam], (err, results) => {
        if (err) {
          return callBack(err);
        } else {
          db.query(`update tb_pinjam set ? where no_pinjam = ?`, [
            data,
            data.no_pinjam,
          ]);
          return callBack(null, results[0]);
        }
      }
    );
  },

  del: (data, callBack) => {
    db.query( `select no_pinjam from tb_pinjam where no_pinjam = ?`, [data.no_pinjam], (err, results) => {
        if (err) {
          return callBack(err);
        } else {
          db.query( `delete from tb_pinjam where no_pinjam = ?`, [data.no_pinjam], (err, result) => {
              if (err) {
                return callBack(err);
              } else {
                db.query( `select * from tb_buku where kd_buku = ?`, [data.kd_buku], (err, results) => {
                    // console.log(!results[0]);
                    // console.log(results[0].stok);
                    // console.log(null);
                    if (err) {
                      console.log(err);
                      return callBack(err);
                    } else {
                      hasil = results[0].stok + 1;
                      db.query(`update tb_buku set stok=? where kd_buku =  ?`, [hasil,data.kd_buku,]);
                    }
                  }
                );
                return callBack(null, result[0]);
              }
            }
          );
        }
      }
    );
  },
};

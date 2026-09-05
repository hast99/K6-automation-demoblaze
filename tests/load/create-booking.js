import http from "k6/http";
import { check } from "k6"; 
export { handleSummary } from "../../reporter.js";

// 1. OPTIONS: Konfigurasi beban pengujian (Berapa banyak user dan berapa lama tes berjalan)
export const options = {
    vus: 10,        // vus = Virtual Users. Artinya kita menyimulasikan 10 pengguna palsu sekaligus.
    duration: "30s", 
};

// 2. DEFAULT FUNCTION: Alur pengujian utama (Akan dijalankan berulang kali oleh 10 user di atas)
export default function () {

    const payload = JSON.stringify({
        firstname: "Hafidh",
        lastname: "QA",
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-01-01",
            checkout: "2026-01-10",
        },
        additionalneeds: "Breakfast",
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Hasil atau respons dari server kemudian disimpan di dalam variabel bernama 'res'.
    const res = http.post(
        "https://restful-booker.herokuapp.com/booking",
        payload,
        params
    );

    // CHECK: Melakukan validasi terhadap hasil respons server yang disimpan di variabel 'res' tadi.
    check(res, {
        // Aturan ini memeriksa apakah Status Code dari server bernilai 200 (artinya server sukses memproses data)
        "Create Booking Success": (r) => r.status === 200,
    });
}
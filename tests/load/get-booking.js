import http from "k6/http"; 
import { check } from "k6"; 

// Fungsi ini otomatis membuat file laporan rapi setelah pengujian selesai.
export { handleSummary } from "../../reporter.js";

export const options = {
    vus: 20,         
    duration: "30s", 
    // THRESHOLDS: Gerbang penentu kelulusan performa (SLA - Service Level Agreement)
    // Digunakan untuk mendeteksi 'Performance Regression' jika ada perlambatan sistem.
    thresholds: {
        // 'p(95)<1000' artinya: 95% dari total request yang dikirim kecepatannya harus di bawah 1000 ms (1 detik).
        // Jika server merespons lebih lambat dari 1 detik (misal 1200 ms), k6 akan menandai tes ini GAGAL (FAIL).
        http_req_duration: ["p(95)<1000"],
    },
};

export default function () {
    
    const res = http.get(
        "https://restful-booker.herokuapp.com/booking"
    );

    check(res, {
        "Get Booking Success": (r) => r.status === 200,
    });
}
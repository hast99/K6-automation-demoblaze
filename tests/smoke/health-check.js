import http from "k6/http"; 
import { check } from "k6"; 

export { handleSummary } from "../../reporter.js";

export const options = {
    vus: 1,        
    iterations: 1, 
};

export default function () {
    
 
    const res = http.get(
        "https://restful-booker.herokuapp.com/ping"
    );

    check(res, {
        // Aturan ini memeriksa: Apakah Status Code yang dikembalikan server bernilai 201 ATAU bernilai 200.
        // Jika salah satu dari status tersebut terpenuhi, maka pengecekan dianggap sukses (Lolos).
        "Health Check Success": (r) => r.status === 201 || r.status === 200,
    });
}
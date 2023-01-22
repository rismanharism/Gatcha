const { execSync } = require('child_process')
const fs = require('fs')

const reconstructedFilename = 'reconstructed.js'

const gatcha = (gacha) => {
    let solution = fs.readFileSync('./index.js', 'utf-8')

    solution = solution.replace(/(let|var) gacha .*/, `$1 gacha = ${gacha}`)

    fs.writeFileSync(reconstructedFilename, solution)

    return String(execSync(`node ${reconstructedFilename}`))
}

const hasil = (angka) => {
    switch (angka) {
        case 1:
            return "coba lagi ya";
            break;
        case 2:
            return "selamat kamu mendapatkan kupon sebanyak 5";
            break;
        case 3:
            return "selamat kamu mendapatkan kupon sebanyak 15";
            break;
        case 4:
            return "selamat kamu mendapatkan kupon sebanyak 50";
            break;
        case 5:
            return "WOW, kamu menang jackpot! Selamat!!";
    }
}

afterAll(() => {
    if (fs.existsSync(reconstructedFilename)) {
        fs.unlinkSync(reconstructedFilename)
    }
})

describe('Gatcha', () => {
    describe('Check Hasil Gatcha untuk angka 1-5', () => {
        it('hasil angka 1 tepat', () => {
            const num = 1
            expect(gatcha(num)).toMatch(hasil(num))
        })
        it('hasil angka 2 tepat', () => {
            const num = 2
            expect(gatcha(num)).toMatch(hasil(num))
        })
        it('hasil angka 3 tepat', () => {
            const num = 3
            expect(gatcha(num)).toMatch(hasil(num))
        })
        it('hasil angka 4 tepat', () => {
            const num = 4
            expect(gatcha(num)).toMatch(hasil(num))
        })
        it('hasil angka 5 tepat', () => {
            const num = 5
            expect(gatcha(num)).toMatch(hasil(num))
        })
    })
})

export function generateRandomSSN(): string {
    let area: number;
    let group: number;
    let serial: number;

    do {
        area = Math.floor(100 + Math.random() * 900); // Area number (001-899)
    } while (area === 666 || area >= 900);

    do {
        group = Math.floor(10 + Math.random() * 90); // Group number (01-99)
    } while (group === 0);

    do {
        serial = Math.floor(1000 + Math.random() * 9000); // Serial number (0001-9999)
    } while (serial < 1000);

    const randomSSN = `${area}-${group}-${serial}`;
    return randomSSN;
}

export function generateRandomZipcode(): string {
    const length = Math.random() < 0.5 ? 5 : 6; // Randomly choose between 5 or 6 digits
    const zipcode = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    return zipcode.toString();
}

export function generateRandomMobileNumber(): string {
    const mobileNumber = Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit number
    return mobileNumber.toString();
}

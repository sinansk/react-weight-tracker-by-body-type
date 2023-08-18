export const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();

    if (today.getMonth() < birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}

// Kullanım örneği:
const birthDate = new Date("1990-05-15"); // Doğum tarihi formatı: "YYYY-MM-DD"
const age = calculateAge(birthDate);
console.log("Yaş:", age);
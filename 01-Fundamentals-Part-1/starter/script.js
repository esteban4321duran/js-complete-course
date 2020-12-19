const currentYear = 2026;
const birthYearEsteban = 2000;
const ageEsteban = currentYear - birthYearEsteban;
const firstName = 'Esteban';
const lastName = 'Duran';

console.log(firstName + ' ' + lastName);
console.log(ageEsteban, ageEsteban * 2, ageEsteban ** 2);

const day = 'monday';

//**** Switch statement ****//
switch (day) {
    case 'monday':
        console.log('Study Computer Architecture');
        console.log('Study Calculus');
        break;
    case 'tuesday':
        console.log('Study Algebra');
        console.log('Study C language');
        break;
    case 'wednesday':
    case 'thursday':
        console.log('Study programming');
        break;
    case 'friday':
    case 'saturday':
        console.log('Practice volleyball');
        break;
    case 'sunday':
        console.log('Rest all day long');
        break;
    default:
        console.log('Invalid day');

}

if (day === 'monday') {
    console.log('Study Computer Architecture');
    console.log('Study Calculus');
} else if (day === 'tueday') {
    console.log('Study Algebra');
    console.log('Study C language');
} else if (day === 'wednesday' || day === 'thursday') {
    console.log('Study programming');
} else if (day === 'friday' || day === 'saturday') {
    console.log('Practice volleyball');
} else if (day === 'sunday') {
    console.log('Rest all day long');
} else {
    console.log('Invalid day');
}


//**** conditional/Ternary operator ****//
const gender = 'female';
const color = gender === 'female' ? 'pink' : 'blue';

//the ternary operator allow us to have conditional statements as expressions. that's powerful AF!!!!
console.log(`My gender is ${gender}. My favourite color is ${gender === 'female' ? 'pink' : 'blue'}`);



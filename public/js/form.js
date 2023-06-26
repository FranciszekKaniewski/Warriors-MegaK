const form = document.getElementById('new-warrior');
const nameInp = document.getElementById('name');
const pointsParagraph = document.getElementById('points');
const hpSpan = document.getElementById('hp');
const strengthSpan = document.getElementById('strength');
const intelligenceSpan = document.getElementById('intelligence');
const dexteritySpan = document.getElementById('dexterity');
const pointsButtons = document.querySelectorAll('.point-btn');

let points = 10;
let hp = 10;
let strength = 0;
let intelligence = 0;
let dexterity = 0;

function init() {
    pointsButtons.forEach(btn => {
        btn.addEventListener('click', changePoints);
    });
    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (!checkValidation()) return;
        const response = await fetch('http://localhost:3000/warriors/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: nameInp.value,
                hp,
                strength,
                intelligence,
                dexterity,
            }),
        });
        reset();
        if (response.ok) {
            alert('Dodano nowego wojownika!');
        } else {
            alert('Coś poszło nie tak, a może wojownik o takiej nazwie już istnieje?');
        }
    });
}

function render() {
    pointsParagraph.innerText = `Punkty do wykorzystania: ${points}`;
    hpSpan.innerText = hp;
    strengthSpan.innerText = strength;
    intelligenceSpan.innerText = intelligence;
    dexteritySpan.innerText = dexterity;
}

function changePoints(e) {
    function ChangeValue(plus,minValue,attribute,span){

        if (plus) {
            attribute ++;
            points --;
        } else if(attribute !== minValue) {
            attribute --;
            points ++;
        }
        span.innerText = attribute;
        pointsParagraph.innerText = `Punkty do wykorzystania: ${points}`;
        return attribute;
    }

    e.preventDefault();
    const { name: action, parentElement } = e.target;
    const attribute = parentElement.classList[0];
    if (points === 0 && action === 'add') return;

    switch (attribute) {
        case 'hp':
            hp = ChangeValue((action === 'add'),10,hp,hpSpan)
            break;
        case 'strength':
            strength = ChangeValue((action === 'add'),0,strength,strengthSpan)
            break;
        case 'intelligence':
            intelligence = ChangeValue((action === 'add'),0,intelligence,intelligenceSpan)
            break;
        case 'dexterity':
            dexterity = ChangeValue((action === 'add'),0,dexterity,dexteritySpan)
            break;
        default:
            break;
    }
}

function checkValidation() {
    if (nameInp.value.length < 1) return false;
    if (points !== 0) return false;
    return true;
}

function reset() {
    nameInp.value = '';
    points = 10;
    hp = 0;
    strength = 0;
    intelligence = 0;
    dexterity = 0;

    render();
}

render();
init();
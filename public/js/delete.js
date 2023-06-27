const deleteBtns = [...document.querySelectorAll('.delete')]

deleteBtns.map(e=>e.addEventListener('click',async ()=>{
    const name = e.parentElement.children[1].children[1].innerText

    const response = await fetch('http://localhost:3000/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name:name,
        }),
    });
    reset();
    if (response.ok) {
        alert('Dodano nowego wojownika!');
    } else {
        alert('Coś poszło nie tak, a może wojownik o takiej nazwie już istnieje?');
    }
}))
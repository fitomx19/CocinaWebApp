const changeState = async (data) => {
     
    console.log(__PEDIDOS__);
    let url = `${__PEDIDOS__}` + 'login';
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        let json = await response.json();
        localStorage.setItem('login', json);

        return json;
    } else {
        throw new Error('Error al iniciar sesión');
    }

}

export default changeState;
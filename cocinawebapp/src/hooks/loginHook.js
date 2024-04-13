const handleLogin = async (data) => {
     
    console.log(__USUARIOS__);
    let url = `${__USUARIOS__}` + 'login';
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

export default handleLogin;
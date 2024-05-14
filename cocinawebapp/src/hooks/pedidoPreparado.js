const handleUpdatePreparado = async (data) => {
     
    console.log(__);
    let url = `${__PEDIDOS__}` + 'ticketPreparacion' + '/' + data.idPedido ; 
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
        
    });

    if (response.ok) {
        let json = await response.json();
        return json;
    } else {
        throw new Error('Error al hacer la peticion');
    }

}

export default handleUpdatePreparado;
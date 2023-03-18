class Renderer{
    renderData(_data) {
        const source = $('#city-template').html();
        const template = Handlebars.compile(source);
        $('#city-container').empty()
        const newHTML = template({ data: _data});
        $('#city-container').append(newHTML);
    }
}
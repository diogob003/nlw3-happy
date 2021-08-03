/***************************************
    leaflet MAP
****************************************/
// Create map
const map = L.map('mapid').setView([-27.21866,-49.61291], 17); //setView([latitude, longitude], zoom)

// create and add OpenStreetMap tileLayer
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
).addTo(map);

// create icon for map marker
const icon = L.icon({
    iconUrl: "/img/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68]
});

// create and add map marker | [latitude longitude]
let marker;

map.on('click', (event) => {
    const latitude = event.latlng.lat
    const longitude = event.latlng.lng
    // console.log(`latitude: ${latitude}, logitude: ${longitude}`)
    document.querySelector('input[name=latitude').value = latitude
    document.querySelector('input[name=longitude').value = longitude

    // remove preview icon
    // if marker = true, this
    marker && map.removeLayer(marker)

    // add icon layer
    marker = L.marker([latitude,longitude], {icon})
    .addTo(map)
});

/***************************************
    IMAGES UPLOAD
****************************************/
// add a function to clean or hide the first .images-Upload
window.document.querySelector('.images-upload > span').addEventListener('click', (event) =>{
    // preview brother(Sibling)
    const input = event.currentTarget.previousElementSibling
    // if input value is empity disable it
    if (input.value == ''){
        input.removeAttribute('required')
        input.parentElement.style.display = 'none'
    }else{
        input.value = ''
    }
})

// link a function with the .images-Upload-Container>button
window.document.querySelector('#images-upload-container > button').addEventListener('click', addImgField)

// add a new .images-Upload field
function addImgField(){
    // get the all .images-Upload
    const $imgUploadOriginal = document.querySelectorAll('.images-upload')

    // if .images-Updalod if diabled then enable it
    if($imgUploadOriginal[0].style.display == 'none'){
        $imgUploadOriginal[0].style.display = 'block'
        $imgUploadOriginal[0].firstElementChild.setAttribute('required', 'yes')
    }

    // create a clone of the last .images-Upload
    const $imgUploadClone = $imgUploadOriginal[$imgUploadOriginal.length-1].cloneNode(true)

    // get the input inside the .image-Upload
    const $imgUploadInput = $imgUploadClone.children[0];

    // if the last .images-Upload > input on the DOCUMENT is empty NOW
    if ($imgUploadInput.value == ''){
        // break the function and exit from it.
        // Same result as "break"
        return
    }

    // clean the input inside $imagesUploadClone value
    $imgUploadInput.value = ''

    // change the id from [image_0] to [image_$imagesUploadQuantity]
    $imgUploadInput.id = $imgUploadInput.id.replace(/[0-9]+/, $imgUploadOriginal.length)

    // insert a .images-Upload clone before the button
    document.querySelector('#images-upload-container').insertBefore(
        $imgUploadClone,
        document.querySelector('#images-upload-container > button')
    );

    // link a function to the span with the red X
    $imgUploadClone.children[1].addEventListener('click', removeImgField)
}
// remove a .images-upload field
function removeImgField(event){
    event.currentTarget.parentElement.remove()
}
/***************************************
    Toggle between "Sim" "Não"
****************************************/
// window.document.querySelector(".button-select").addEventListener('click', toggleSelect)

// function toggleSelect(event){
//     // remove .active class
//     document.querySelectorAll(".button-select button").forEach(
//         function(button){
//             button.classList.remove('active')
//         }
//     )
//     // add .active class
//     const buttonTarget = event.target
//     buttonTarget.classList.add('active')

//     // put button value on 'open_on_weekends' input
//     document.querySelector('input[name="open_on_weekends"]').value = buttonTarget.value
// }

/***************************************
    Form validation
****************************************/
// form validation
function validate(event){
    //remove previous validation alert
    document.querySelectorAll('.validation-alert').forEach((p) =>{
        p.remove()
    })
    
    // get all input and textarea
    document.querySelectorAll('input, textarea').forEach((element)=>{
        // if element is empty and isn't input[name=image_0]
        if((element.value == '') && (element.id != 'image_0')){
            // prevent submit the form
            event.preventDefault()

            // get input label and label inner text
            let labelElement = (document.querySelector(`label[for="${element.id}"]`))
            let labelText = "preencha " + (labelElement.firstChild.textContent.toLowerCase())

            // if validation refers to map latitude
            if (element.name == 'latitude'){
                createValidationAlert(document.querySelector('.map-container'),
                    `marque o local no mapa`
                )
            }else if(element.name == 'longitude'){
                // fazer nada
            }else{
                createValidationAlert(labelElement, labelText)
            }
        }
    })
    // radio input validation
    const open_on_weekends = document.getElementsByName('open_on_weekends')
    // if both input isn't checked
    if((open_on_weekends[0].checked == false) && (open_on_weekends[1].checked == false)){
        event.preventDefault()
        createValidationAlert((document.querySelector('.weekends-choose')), "marque se atende aos finais de semana")
    }
}
function createValidationAlert(element, text) {
    element.insertAdjacentHTML(
        'beforebegin',
        `<p class="validation-alert">Por favor, ${text}</p>`
    )
    // scroll to 1st alert
    document.getElementsByClassName('validation-alert')[0].scrollIntoView()
}
/***************************************
    Happy logo action
****************************************/
window.document.querySelector('#logo-header').addEventListener('click', () => {
    window.document.location.href = '/orphanages-map'
})


// script para testes
document.querySelectorAll('input, textarea').forEach((inp)=>{
    inp.removeAttribute('required')
    inp.removeAttribute('pattern')
})
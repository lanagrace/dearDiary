/* var submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click',(e)=>{

    e.preventDefault();
    video.loadPixels();
    const image64 = video.canvas.toDataURL();
    console.log('submitted');
    db.collection('log').doc().set({
        caption: document.getElementById("mood").value,
        latitude: document.getElementById("latitude").textContent,
        longitude: document.getElementById("longitude").textContent
    })
})
 */
window.onload = () => {
    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
   return [
       {
           name: 'Tržni centar Delta City - aktuelni popusti u svim radnjama:',
           location: {
               lat: 44.83718,
               lng: 20.38938,
           }
       },
       {
           name: 'Tržni centar Delta City - aktuelni popusti u svim radnjama:',
           location: {
               lat: 44.80558,
               lng: 20.40524,
           }
        
       },
    
   ];
}

function renderPlaces(places) {
   let scene = document.querySelector('a-scene');

   places.forEach((place) => {
       let latitude = place.location.lat;
       let longitude = place.location.lng;
       let name2 = place.name;

       const model = document.createElement('a-image');
                   model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                   model.setAttribute('name', name2);
                   model.setAttribute('src', 'map-marker.png');

                   // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
                   model.setAttribute('scale', '20, 20');
                   
       model.addEventListener('loaded', () => {
           window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
       });

       const clickListener = function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        const name = ev.target.getAttribute('name');

        const el = ev.detail.intersection && ev.detail.intersection.object.el;

        if (el && el === ev.target) {
            const label = document.createElement('span');
            const container = document.createElement('div');
            const btn = document.createElement('button');
            container.setAttribute('id', 'place-label');
            const link = document.createElement('a');
            link.setAttribute('href', 'https://www.bershka.com/rs/%C5%BEene/promocija%3A-do-40%25-popusta-c1010419519.html');
            label.innerText = name;
            btn.innerText = 'Close';
            link.innerText = 'Bershka promocije';
            container.appendChild(label);
            container.appendChild(btn);
            container.appendChild(link);
            document.body.appendChild(container);

            btn.addEventListener("click", function() {
                container.parentElement.removeChild(container);
              });

           // setTimeout(() => {
             //   container.parentElement.removeChild(container);
            //}, 1500);
        }
    };

    model.addEventListener('click', clickListener);
       scene.appendChild(model);
   });
}
        
        
        
        
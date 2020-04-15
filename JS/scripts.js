




 var pokemonRepository = (function(){
      var repository =  [];
      var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
      
      function add(pokemon){
        repository.push(pokemon);
    }
    function getAll(){
        return repository;
    }
         
        // adds each pokemon to the pokemon list
      function addlistItem(pokemon) {
        var $pokemonList = document.querySelector('.pokemon_list');

           var $listItem = document.createElement('li');
             var $button= document.createElement('button');
              $button.innerText = pokemon.name;
               $button.classList.add('pokemon-name');
                $listItem.appendChild($button);
                  $pokemonList.appendChild($listItem);
                   $button.addEventListener('click', function (event) {
                   showDetails(pokemon)}
            
        )};


     

     function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            var pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (error) {
          console.error(error);
        })
      }


      function loadDetails(item) {
        var url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.weight = details.weight;
          item.types = details.types;
          
        }).catch(function (e) {
          console.error(e);
        });
      }

    
    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
          console.log(item);  
          showModal(item);
        });
      }

      //showModal content
      function showModal(item) {
        var $modalContainer = document.querySelector('#modal-container');

        //clear $modalContainer
        $modalContainer.innerHTML = " ";

        // add a div to DOM
        var modal = document.createElement('div');

        //adds class to DOM
        modal.classList.add('modal');

           //add close button to modal
        var closeButtonElement = document.createElement('button');
            closeButtonElement.innerText = 'close';
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.addEventListener('click', hideModal);

        // add item name to modal
        var nameElement = document.createElement('h1');
            nameElement.innerText = item.name;

           var imageElement = document.createElement('img');
           imageElement.attr('src', item.imageUrl);
      
           // add height to modal
        var heightElement = document.createElement('p');
        heightElement.innerText = 'Height: ', item.height;
        
        // add weight to modal
        var weightElement = document.createElement('p');
        weightElement.innerText = 'Weight: ', item.weight;
        
        // add type to modal
        var typeElement = document.createElement('p');
        typeElement.innerText = 'Type: ', item.type;
         
        modal.appendChild(nameElement);
        modal.appendChild(imageElement);
        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        $modalContainer.appendChild(modal);

        $modalContainer.classList.add('.is-visible');

        

        $modalContainer.addEventListener('click', (e) => {
          var target = e.target;
          if (target === $modalContainer) {
            hideModal();
          }
        });

        window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
            hideModal();  
          }
        });

      }

         // hides modal when close button, target, escape button is hit.
        function hideModal () {
          $modalContainer.classList.remove('is-visible');

        }



        

        

            
        return {
        add: add,
        getAll : getAll,
        addlistItem: addlistItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal,
        hideModal: hideModal,
    };
    
   
  })();

  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addlistItem(pokemon);
    });   
});
    

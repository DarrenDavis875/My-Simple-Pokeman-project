




 var pokemonRepository = (function(){
      var repository =  [];
      var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
      
      function add(pokemon){
        repository.push(pokemon);
    }
    function getAll(){
        return repository;
    }

     

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
          item.types = Object.keys(details.types);
        }).catch(function (e) {
          console.error(e);
        });
      }


    function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
          console.log(item);   });
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
              
        return {
        add: add,
        getAll : getAll,
        addlistItem: addlistItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
    
 


    
    
  })();

  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });   
});
    

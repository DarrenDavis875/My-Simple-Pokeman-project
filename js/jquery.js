var pokemonRepository = (function () {
    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    var $modalContainer = $('.modal-container');
    function add(pokemon) {
      repository.push(pokemon);
    }
    function getAll() {
      return repository;
    }
  
    var $pokemonList = $('.pokemon_list');
  
    // adds each pokemon to the pokemon list
    function addlistItem(pokemon) {
       
       var listItem = $('<button type ="button" class="pokemon-button"></button>');
       listItem.text(pokemon.name);
       $($pokemonList).append(listItem);
      $(listItem).on('click',(function(){
         showDetails(pokemon);
      }));
       }
    
  
  
      function loadList() {
      return $.ajax(apiUrl)
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
  
          add(pokemon);
        });
  
      })
      .catch(function (error) {
        console.error(error);
      })
    }
      
  
     
    function loadDetails(item) {
      var url = item.detailsUrl;
      return $.ajax(url)
        .then(function(details) {
          // add the details to the item
          item.imageUrlFront = details.sprites.front_default;
          item.imageUrlBack = details.sprites.back_default;
          item.height = details.height;
          item.weight = details.weight;
          })
        
        .catch(function(e) {
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
      //clear $modalContainer
      $(modalContainer).empty();
      // add a div and class to DOM
      var modal = $('<div class = ',modal,'></div');
      
      //add close button to modal
      var closeButtonElement = $('<button class= ',modal-close,'>close</button>');
       $(closeButtonElement).on('click', hideModal);
      // add item name to modal
      var nameElement = $('<h1>' + item.name + '</h1>');
      
      var imageElementFront = $('<img>');
      imageElementFront.attr('src',item.imageUrlFront);
  
      var imageElementBack = $('<img>');
      imageElementBack.attr('src', item.imageUrlBack);
      // add height to modal
      var heightElement = $('<p>' + 'Height: ' + item.height + 'm','</p>');
      
      // add weight to modal
      var weightElement = $('<p>' + 'Weight: ' + item.weight + 'kg','</p>');
      
      $(modal).append(closeButtonElement);
      $(modal).append(imageElementFront);
      $(modal).append(imageElementBack);
      $(modal).append(heightElement);
      $(modal).append(weightElement);
      $($modalContainer).append(modal);
      $($modalContainer).addClass('is-visible');
    }
  
      
  
      
    
    $($modalContainer).on('click', hideModal);
      
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });
    // hides modal when close button, target, escape button is hit.
    function hideModal() {
      $modalContainer.classList.remove('is-visible');
    }
    return {
      add: add,
      getAll: getAll,
      addlistItem: addlistItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      showModal: showModal,
      hideModal: hideModal,
    };
  })();
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addlistItem(pokemon);
    });
  });
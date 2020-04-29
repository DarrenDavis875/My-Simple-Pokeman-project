var pokemonRepository = (function () {
    var repository = [];
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    var $modalContainer = $('#modal-container');
    function add(pokemon) {
      repository.push(pokemon);
    }
    function getAll() {
      return repository;
    }
  
    var $pokemonList = $('.pokemon_list');
  
 // adds a pokemon button to the pokemon list
    function addListItem(pokemon) {
      var $pokemonList = $('.pokemon_list');
      var $button = <button type="button" class="btn btn-primary btn-lg btn-block btn-list-group-item" data-toggle="modal" data-target="#exampleModal"> + item.name + </button>;
      var $listItem = $('<li>');
      $listItem.append($button);
      $pokemonList.append($listItem);
      $($button).on('click', (function () {
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
     $($modalContainer).text('');
    $($modalContainer).addClass('is-visible');


  // add a div and class to DOM
     var modal = $('<div>');
     modal.addClass('modal');
      
  //add close button to modal
    var closeButtonElement = $('<button>');
      closeButtonElement.addClass('modal-close');
    / closeButtonElement.text('close');
    $(closeButtonElement).on('click', hideModal);

//   add item name to modal
      var nameElement = $('<h1>');
      nameElement.text(item.name);
      
      var imageElementFront = $('<img>');
     imageElementFront.attr('src',item.imageUrlFront);
  
      var imageElementBack = $('<img>');
      imageElementBack.attr('src', item.imageUrlBack);
  // add height to modal
     var heightElement = $('<p>');
     heightElement.text('Height: ' + item.height + 'm');
  // add weight to modal
      var weightElement = $('<p>');
      weightElement.text('Weight: '+ item.weight + 'kg');


    $(modal).append(closeButtonElement);
    $(modal).append(imageElementFront);
    $(modal).append(imageElementBack);
    $(modal).append(heightElement);
   $(modal).append(weightElement);
   $($modalContainer).append(modal);
     
     }
      
   
   $($modalContainer).on('click', hideModal);

   $(window).keydown(function(e) {
      if (e.key === 'Escape' && $($modalContainer).addClass('is-visible')) {
        hideModal();
      }
    });

      
  
    // hides modal when close button, target, escape button is hit.
   function hideModal() {
     $($modalContainer).removeClass('is-visible');
    }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      showModal: showModal,
      hideModal: hideModal,
    };
  })();
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
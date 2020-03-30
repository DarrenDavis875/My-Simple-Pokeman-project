




 var pokemonRepository = (function(){
      var repository =  [
        {
            name: 'Ivysour',
            height:3,
            type: ['grass', 'normal']
    
        },
        {
            name: 'Blastoise',
            height:4,
            type: ['normal','grass']
        },
        {
            name:'Pidgeot',
            height:5,
            type: ['poison','grass']
        }
    
    ];
    var $pokemonList = document.querySelector('.pokemon_list');

    function add(item){
        repository.push(item);
    }
    function getAll(){
        return repository;
    }
    function showDetails(pokemon) {
        console.log(pokemon)
    }
    //function to add each pokemon to the list
      function addlistItem(pokemon) {

        var $listItem = document.createElement('li');
        var $button= document.createElement('button');
        $button.innerText = pokemon.name;
        $button.classList.add('pokemon-name');
        $listItem.appendChild($button);
        $pokemonList.appendChild($listItem);
        $button.addEventListner(click,function(event) {
            showDetails(pokemon)
        });
              
        return {
        add: add,
        getAll : getAll,
        addlistItem: addlistItem,
    };

    
    
  })(); 

 pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addlistItem(pokemon);
     
});
    

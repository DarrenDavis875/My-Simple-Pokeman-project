




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
    function add(pokemon){
        repository.push(pokemon);
    }
    function getAll(){
        return repository;
    }
    return {
        add: add
        getAll: getAll
    };
  })(); 

  pokemonRepository.getAll().forEach(function(pokemon){
    document.write (pokemonRepository.add.name + ' (Height: ', pokemonRepository.add.height + ')' + '<br>' ) 
});
    

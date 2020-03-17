var repository = [
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

for(var i = 0; i < repository.length; i++){
if (repository[i].height > 4) {
    document.write(repository[i].name + ' (Height: ' + repository[i].height + ') Wow, thats big!' + '<br>');
} else {
     document.write(repository[i].name + ' (Height: ' + repository[i].height + ')' + '<br>');
}

}

repository.forEach(function(property){
    document.write (repository.name + ' (Height: ', repository.height + ')' + '<br>' )    
}); 